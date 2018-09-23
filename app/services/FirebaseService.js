import 'firebase/database';

import firebase from 'firebase/app';

export const initialiseFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyBO-WRCaI8AgCHfIE5WDmkpP3-uYW6zPUg',
    authDomain: 'to-do-later.firebaseapp.com',
    databaseURL: 'https://to-do-later.firebaseio.com',
    projectId: 'to-do-later',
    storageBucket: 'to-do-later.appspot.com',
    messagingSenderId: '844883333608'
  };
  firebase.initializeApp(firebaseConfig);
}

export const firebaseService = firebase;
