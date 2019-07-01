import Realm from 'realm';

export const LogSchema = {
  name: 'Log',
  properties: {
    timestamp: 'int',
    sensorId: 'string',
    topic: 'string',
    data: 'string',
  },
  primaryKey: 'timestamp',
}

let realmSingleton = null;

export default async () => {
  if (realmSingleton && !realmSingleton.isClosed) {
    return realmSingleton;
  }

  const realm = await Realm.open({
    schema: [
      LogSchema,
    ],
  });
  realmSingleton = realm;
  return realmSingleton;
}
