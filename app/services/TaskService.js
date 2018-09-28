import { addHours, isPast } from 'date-fns';
import { assign, sortBy } from 'lodash';
import Sherlock from 'sherlockjs';

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
  description: '',
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

export const partialTaskDataFromNaturalText = (text) => {
  const taskData = {}

  const eventData = Sherlock.parse(text)
  if (eventData.eventTitle) {
    taskData.title = eventData.eventTitle
  }

  let date = eventData.startDate || eventData.endDate;
  if (!date) {
    return taskData
  }

  if (eventData.isAllDay) {
    date = addHours(date, 10)
  }

  taskData.dueDate = dueDateFrom(date)
  return taskData
}

export const dueDateFrom = (date) => date.toISOString()
