import firebase from 'firebase';
import md5 from 'md5';
import { assign } from 'lodash';

export const userData = {
  _currentUser: null,
  _currentUserRef: null,

  currentUser: function () {
    if (!this._currentUser) {
      throw new Error();
    }

    return this._currentUser;
  },

  update: function (updater) {
    updater(this.currentUser());
    return this._currentUserRef.set(this._currentUser);
  },

  _setUser: function (user, ref) {
    this._currentUser = assign(newBlankUser(), user);
    this._currentUserRef = ref;
  }
};

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

  const newUser = { passwordHash };
  userData._setUser(newUser, userRef);
  return userRef.set(newUser);
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

  userData._setUser(user, userRef);
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

const newBlankUser = () => {
  return {
    tasks: [],
  }
}