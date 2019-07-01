import _ from 'lodash';
import BufferReader from 'buffer-reader';
import int64Buffer from 'int64-buffer';
const Int64LE = int64Buffer.Int64LE;

var Engine = {};

function parseAccelerometer(message) {
  var reader = new BufferReader(message);
  var deviceID = "";
  var numPackages = 0;
  var dataArr = [];
  var strTS = "";
  var dataCount = 0;
  var dataFreq = 0;
  var deltaTS = 0;
  var startTS = 0;
  var endTS = 0;
  try {
    deviceID = reader.nextString(5);
    numPackages = reader.nextInt8(1);
    for (var np = 0; np < numPackages; np++) {
      var bufTS = Buffer.concat([reader.nextBuffer(4), reader.nextBuffer(4)], 8);
      var bigTS = new Int64LE(bufTS);
      var dataSense = [];
      strTS = bigTS + "";
      dataFreq = reader.nextInt16LE(2);
      dataCount = reader.nextInt16LE(2);
      startTS = parseInt(strTS);
      deltaTS = Math.floor(((dataCount - 1) / dataFreq) * 1000);
      endTS = startTS + deltaTS;
      for (var i = 0; i < dataCount; i++) {
        dataSense.push([reader.nextInt16LE(2), reader.nextInt16LE(2), reader.nextInt16LE(2)]);
      }
      dataArr.push({
        startTS:startTS,
        endTS:endTS,
        dataFreq:dataFreq,
        dataCount:dataCount,
        dataSense:dataSense
      });
    }
  } catch (e) {
    console.error(e);
  }

  return {
    deviceID:deviceID,
    data:dataArr
  };
}

function parseTemperature(message) {
  var reader = new BufferReader(message);
  var deviceID = "";
  var numPackages = 0;
  var dataArr = [];
  var strTS = "";
  var startTS = 0;
  var endTS = 0;
  var temperature = 0;
  try {
    deviceID = reader.nextString(5);
    numPackages = reader.nextInt8(1);
    for (var np = 0; np < numPackages; np++) {
      var bufTS = Buffer.concat([reader.nextBuffer(4), reader.nextBuffer(4)], 8);
      var bigTS = new Int64LE(bufTS);
      strTS = bigTS + "";
      startTS = endTS = parseInt(strTS);
      temperature = reader.nextFloatLE(4);
      var deviceTick = reader.nextUInt32LE(4);
      dataArr.push({
        startTS:startTS,
        endTS:endTS,
        temperature:temperature,
      });
    }
  } catch (e) {
    console.error(e);
  }

  return {
    deviceID:deviceID,
    data:dataArr
  };
}

function parseDetector(message) {
  var reader = new BufferReader(message);
  var deviceID = "";
  var numPackages = 0;
  var dataArr = [];
  var strTS = "";
  var startTS = 0;
  var endTS = 0;
  var proba = 0;
  var thres = 0;
  var isClf = 0;
  var run = 0;
  try {
    deviceID = reader.nextString(5);
    numPackages = reader.nextInt8(1);
    for (var np = 0; np < numPackages; np++) {
      startTS = endTS = reader.nextUInt32LE() * 1000;
      reader.nextFloatLE(); // unused
      proba = reader.nextFloatLE();
      thres = reader.nextFloatLE();
      reader.nextFloatLE(); // unused
      var pred = reader.nextUInt8();
      var marker = reader.nextUInt8();
      isClf = marker === 255 ? 0 : 1;
      run = marker === 255 ? pred : marker;
      reader.nextUInt16LE(); // unused
      dataArr.push({
        startTS:startTS,
        endTS:endTS,
        proba,
        thres,
        isClf,
        run,
      });
    }
  } catch (e) {
    console.error(e);
  }

  return {
    deviceID:deviceID,
    data:dataArr
  };
}

function normalizeSenses(senses, normalizeConstant) {
  normalizeConstant = normalizeConstant || 3.9;
  return _.map(senses, function(sense) {
    return [
            normalizeConstant * sense[0],
            normalizeConstant * sense[1],
            normalizeConstant * sense[2],
            normalizeConstant * (Math.sqrt(Math.pow(sense[0], 2) + Math.pow(sense[1], 2) + Math.pow(sense[2], 2)))
          ];
  });
}

function getEventGroup(eventType) {
  var deviceLogEvent = [
    {
      eventType: 'A',
      eventGroup: 'Accelerometer',
      eventDetail: {
        C: 'clear FIFO',
        U: 'config updated',
        F: 'config update fail',
        P: 'Accelerometer not detected',
        D: 'log prediction',
        M: 'start sensing',
        B: 'stop sensing',
        V: 'model updated',
        O: 'model update failed',
      }
    },
    {
      eventType: 'F',
      eventGroup: 'Logging FS',
      eventDetail: {
        O: 'open new log object',
        F: 'mounting error',
        M: 'mounting info',
      }
    },
    {
      eventType: 'N',
      eventGroup: 'NTP Client',
      eventDetail: {
        U: 'time updated',
      }
    },
    {
      eventType: 'W',
      eventGroup: 'Wifi',
      eventDetail: {
        C: 'connected and got IP',
        D: 'disconnected',
        U: 'config updated',
        F: 'config update fail',
      }
    },
    {
      eventType: 'S',
      eventGroup: 'System',
      eventDetail: {
        R: 'reset info',
        X: 'exception info',
      }
    },
    {
      eventType: 'M',
      eventGroup: 'MQTT',
      eventDetail: {
        C: 'connected',
        D: 'disconnected',
        U: 'config updated',
        F: 'config update fail',
      }
    },
    {
      eventType: 'I',
      eventGroup: 'User interface',
      eventDetail: {
        F: 'invalid command format',
      }
    },
    {
      eventType: 'L',
      eventGroup: 'Logging Object',
      eventDetail: {
        S: 'storing data',
        F: 'fetching data',
        V: 'buffer overflow',
      }
    },
    {
      eventType: 'C',
      eventGroup: 'SD Card',
      eventDetail: {
        E: 'error',
        S: 'single block write accept error',
        M: 'multiple block write accept error',
      }
    },
    {
      eventType: 'T',
      eventGroup: 'Temperature Sensor',
      eventDetail: {
        U: 'interval updated',
        F: 'interval update fail: to short',
      }
    },
    {
      eventType: 'H',
      eventGroup: 'Feeder',
      eventDetail: {
        S: 'setting',
        I: 'info',
        T: 'time',
        U: 'config updated',
        F: 'config update failed',
        B: 'feeder stop by command',
        A: 'feeder schedule stop',
        M: 'feeder schedule start',
      }
    }
  ];

  var relatedEvent = _.find(deviceLogEvent, {eventType: eventType});

  return {
    getGroupName: function() {
      return (typeof relatedEvent !== 'undefined') ? relatedEvent.eventGroup : `Unknown(${eventType})`;
    },
    getGroupDetail: function(detailType) {
      var detailName = `Unknown(${detailType})`;
      if (typeof relatedEvent !== 'undefined') {
        if (_.has(relatedEvent.eventDetail, detailType)) {
          detailName = relatedEvent.eventDetail[detailType];
        }
      }
      return detailName;
    }
  };
}

function parseDeviceLog(message) {
  var reader = new BufferReader(message);
  var deviceID = "";
  var logArr = [];
  var lengthSpecMsg = 10;

  try {
    deviceID = reader.nextString(5);
    var nextMsgLength = reader.nextInt8(1);
    while (2 + 2 !== 5) {
      var logMsgLength = nextMsgLength - lengthSpecMsg;
      var eventGroupChar = reader.nextString(1);
      var eventGroupDetailChar = reader.nextString(1);
      var eventGroup = getEventGroup(eventGroupChar);
      var eventDesc = `${eventGroup.getGroupName()}: ${eventGroup.getGroupDetail(eventGroupDetailChar)}`;
      var rtcClock = reader.nextUInt32LE(4) * 1000;
      var deviceTick = reader.nextUInt32LE(4);
      var logMsg = "";
      var UUID = "";

      if (logMsgLength > 0) {
        logMsg = reader.nextString(logMsgLength);
        var isUUID = logMsg.match(/(uuid|UUID)\((\w|\d)+\)/g);
        if (isUUID) {
          UUID = isUUID[0].slice(5, (isUUID[0].length - 1));
        }
      }

      logArr.push({
        eventDesc:eventDesc,
        rtcClock:rtcClock,
        deviceTick:deviceTick,
        logMsg:logMsg,
        UUID: UUID
      });
      nextMsgLength = reader.nextInt8(1);
    }
  } catch (e) {
    // console.error(e);
  }

  return {
    deviceID:deviceID,
    logs:logArr
  };
}

function parsePredictionLog(message) {
  var reader = new BufferReader(message);
  var deviceID = "";
  var logArr = [];

  try {
    deviceID = reader.nextString(5);
    var bufTS = Buffer.concat([reader.nextBuffer(4), reader.nextBuffer(4)], 8);
    var probaCount = null;
    while (2 + 2 !== 5) {
      // timestamp
      var bigTS = parseInt((new Int64LE(bufTS)) + "");
      // probas
      probaCount = reader.nextInt8(1);
      var probas = [];
      for (var iProba = 0; iProba < probaCount; iProba++) {
        var probaID = reader.nextString(4);
        var proba = reader.nextFloatLE(4);
        probas.push({
          probaID:probaID,
          proba:proba,
        });
      }
      // predict
      var predict = reader.nextInt8(1);
      // push array
      logArr.push({
        timestamp:bigTS,
        probas:probas,
        predict:predict,
      });
      // forward pointer byte
      bufTS = Buffer.concat([reader.nextBuffer(4), reader.nextBuffer(4)], 8);
    }
  } catch (e) {
    console.error(e);
  }

  return {
    deviceID:deviceID,
    logs:logArr
  };
}

Engine.parseAccelerometer = parseAccelerometer;
Engine.parseTemperature = parseTemperature;
Engine.parseDetector = parseDetector;
Engine.normalizeSenses = normalizeSenses;
Engine.parseDeviceLog = parseDeviceLog;
Engine.parsePredictionLog = parsePredictionLog;

export default Engine;
