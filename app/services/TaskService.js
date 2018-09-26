import { assign } from 'lodash';

import { userData } from './UserService';

export const userTasks = {
  all() {
    return userData.currentUser().tasks
  },

  update(updater = () => {}) {
    userData.update(() => updater(this.all()))
  },
}

export const newBlankTask = () => ({
  title: '',
  isCompleted: false,
})

export const preprocessTasks = (tasks) => {
  return tasks.map(task => assign(newBlankTask(), task))
}
