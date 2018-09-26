import { assign } from 'lodash';

import { userData } from './UserService';

export const userTasks = {
  all: function () {
    return userData
      .currentUser()
      .tasks
      .map(task => assign(newBlankTask(), task))
  },

  update: function (updater) {
    userData.update(user => updater(user.tasks))
  },
}

export const newBlankTask = () => ({
  title: '',
})
