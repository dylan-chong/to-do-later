import firebase from 'firebase';
import md5 from 'md5';

export const userData = {
  currentUser: null,
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

  userData.currentUser = userRef;
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

  userData.currentUser = userRef;
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
