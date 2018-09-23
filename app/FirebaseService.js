import 'firebase/database';

import firebase from 'firebase/app';
import md5 from 'md5';

export const firebaseData = {
  currentUser: null,
};

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
  username = username.trim();
  const userRef = getUserRef(username);
  const passwordHash = hashPassword(password);

  const user = (await userRef.once('value')).val();
  if (user) {
    try {
      return await login(username, password);
    } catch (e) {
      throw new Error('User already exists');
    }
  }

  firebaseData.currentUser = userRef;
  return userRef.set({ passwordHash });
};

export const login = async (username, password) => {
  const userRef = getUserRef(username);
  const user = (await userRef.once('value')).val();
  const passwordHash = hashPassword(password);
  if (!user) {
    return signup(username, password);
  }

  if (user.passwordHash != passwordHash) {
    throw new Error('Incorrect password');
  }

  firebaseData.currentUser = userRef;
};

export const getUserRef = (username) => {
  username = username.trim();
  if (!username || username.indexOf('/') != -1) {
    throw new Error('Not a valid username: ' + username);
  }

  return firebase.database().ref(`/users/${username}`);
};

const hashPassword = (passwordString) => {
  passwordString = passwordString.trim();
  if (!passwordString) {
    throw new Error('Not a valid password: ' + passwordString);
  }

  return md5(passwordString);
}
