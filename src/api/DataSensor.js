import RN from 'react-native';
import DataUtil from 'libs/DataUtil';
import logDao from 'src/database/log';
import sensorApi from 'src/api/sensor';
import brokerApi from 'src/api/broker';
import config from 'src/config';

const downloadInfo = async (sensorId, Token) => {
  const info = await sensorApi.getInfo(sensorId, Token);
  await logDao.insert(sensorId, 'sen_info', JSON.stringify(info));
}

const downloadAll = (sensorId, Token, senMov, senClf, senTem) => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(config.urlWsSensor);

    socket.onopen = (event) => {
      socket.send('getData');
    }

    socket.onmessage = async (event) => {
      const message = !!event.data ? event.data : 'EMPTY';
      if (message === 'EMPTY') {
        resolve();
        socket.close();
        return;
      }

      const [ topic, data ] = message.split(':');
      if (!topic || !data) {
        socket.send('getData');
      } else {
        try {
          await logDao.insert(sensorId, topic, data);
          parseData(topic, data, senMov, senClf, senTem);
          socket.send('getData');
        } catch (err) {
          console.log(err);
          reject(err);
          socket.close();
        }
      }
    }

    socket.onerror = (event) => {
      event.message = 'Error: ' + (event.message || 'WebSocket error');
      reject(event);
      socket.close();
    }
  });
}

const parseBase64 = (data) => {
  while (data.length % 4 > 0) {
    data += '=';
  }

  let length = (data.length / 4) * 3;
  if (data.endsWith('==')) {
    length -= 2;
  } else if (data.endsWith('=')) {
    length -= 1;
  }

  return Buffer.alloc(length, data, 'base64');
}

const parseData = (topic, data, senMov, senClf, senTem) => {
  if (['sen_clf', 'sen_mov', 'sen_tem'].indexOf(topic) === -1) return;
  if (!senMov && !senClf && !senTem) return;

  const buffer = parseBase64(data);

  if (topic === 'sen_clf' && senClf) {
    const content = DataUtil.parseDetector(buffer);
    content.data.forEach(log => {
      senClf.push({
        timestamp: parseInt(log.startTS/1000),
        proba: log.proba,
        thres: log.thres,
        isClf: log.isClf,
        run: log.run,
      })
    });
  } else if (topic === 'sen_mov' && senMov) {
    const content = DataUtil.parseAccelerometer(buffer);
    content.data.forEach(second => {
      if (senMov.labelingTime && second.startTS < senMov.labelingTime) {
        return;
      }
      second.dataSense.forEach(sample => {
        senMov.push(sample);
      })
    });
  } else if (topic === 'sen_tem' && senTem) {
    const content = DataUtil.parseTemperature(buffer);
    content.data.forEach(log => {
      senTem.push({
        timestamp: parseInt(log.startTS/1000),
        temperature: log.temperature,
      });
    });
  }
}

// =============================================================================

const uploadAll = async () => {
  await brokerApi.connect();

  let error;
  try {
    let log = await logDao.selectAny();
    while (log) {
      const publish = ['sen_info', 'sen_thr'].indexOf(log.topic) >= 0 ? (
        brokerApi.publishString
      ) : (
        brokerApi.publishBase64
      )
      await publish(log.topic, log.data);
      await logDao.deleteByTimestamp(log.timestamp);
      log = await logDao.selectAny();
    }
  } catch (err) {
    error = err;
  }

  await brokerApi.disconnect();
  if (error) {
    throw error;
  }
}

// =============================================================================

export default {
  downloadInfo,
  downloadAll,
  parseBase64,
  parseData,
  uploadAll,
}
