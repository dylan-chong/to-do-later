import firebase from 'firebase/app';
import 'firebase/database';

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

export const signup = async (username, password) => {
  if (!username.trim()) {
    throw new Error('Not a valid username: ' + username);
  }
  if (!password.trim()) {
    throw new Error('Not a valid password: ' + password);
  }

  const userRef = firebase.database().ref(`/users/${username}`);
  const user = (await userRef.once('value')).val();
  if (user) {
    throw new Error('User already exists');
  }

  return userRef.set({ hasLoggedInBefore: true });
};
