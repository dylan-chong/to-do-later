import { assign, sortBy } from 'lodash';
import { isPast } from 'date-fns';

import { userData } from './UserService';

export const userTasks = {
  all() {
    return userData.currentUser().tasks
  },

  update(updater = () => {}) {
    userData.update((user) => {
      updater(this.all())

      user.tasks = sortBy(user.tasks, [
        ({ dueDate }) => dueDate ? new Date(dueDate).getTime() : Number.MAX_SAFE_INTEGER,
        ({ title }) => title,
      ])
    })
  },
}

export const newBlankTask = () => ({
  title: '',
  isCompleted: false,
  dueDate: null,
})

export const preprocessTasks = (tasks) => {
  return tasks.map(task => assign(newBlankTask(), task))
}

export const isTaskOverdue = ({ dueDate, isCompleted }) => {
  if (!dueDate) {
    return false
  }
  return isPast(dueDate) && !isCompleted
}
