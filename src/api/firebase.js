import * as firebase from 'firebase';
import 'firebase/firestore';

import firebaseConfig from 'src/config/firebase';

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({
  timestampsInSnapshots: true,
});

export default firebase;
