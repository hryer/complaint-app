import Realm from 'realm';

import getRealm, { LogSchema } from './index';

const OBJECT = LogSchema.name;

const insert = async (sensorId, topic, data) => {
  const realm = await getRealm();
  realm.write(() => {
    realm.create(OBJECT, {
      timestamp: (new Date()).getTime(),
      sensorId,
      topic,
      data,
    });
  });
}

const selectAll = async () => {
  const realm = await getRealm();
  const rows = Array.prototype.slice.call(
    realm.objects(OBJECT)
  );
  return rows;
}

const selectAny = async () => {
  const realm = await getRealm();
  const rows = Array.prototype.slice.call(
    realm.objects(OBJECT).slice(0, 1)
  );
  let rowFirst;
  for (let row of rows) {
    if (!rowFirst) {
      rowFirst = row;
    }
    if (row.topic === 'sen_mov') {
      return row;
    }
  }
  return rowFirst;
}

const deleteByTimestamp = async (timestamp) => {
  const realm = await getRealm();
  const rows = realm.objects(OBJECT).filtered('timestamp = $0', timestamp);
  realm.write(() => {
    realm.delete(rows);
  });
}

const selectMeta = async () => {
  const realm = await getRealm();
  const rows = Array.prototype.slice.call(
    realm.objects(OBJECT)
  );
  return rows;
}

const deleteAll = async () => {
  const realm = await getRealm();
  realm.write(() => {
    const rows = realm.objects(OBJECT);
    realm.delete(rows);
  });
}

export default {
  insert,
  selectAll,
  selectAny,
  deleteByTimestamp,
  selectMeta,
  deleteAll,
};
