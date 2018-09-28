import { userData } from './UserService';

export const userSettings = {
  all() {
    return userData.currentUser().settings
  },

  update(updater = () => {}) {
    userData.update(() => updater(this.all()))
  },
}

export const newBlankSettings = () => ({
  showCompletedTasks: false,
})


export const matchesFilters = task => {
  const user = userData.currentUser()
  if (!user.settings.showCompletedTasks && task.isCompleted) return false
  return true
};

