import {store} from '../store'

export const computed = {
  computed: {
    appUser () {
      return store.getters.user
    },
    appRole () {
      return store.getters.role
    },
    appProject () {
      return this.$store.getters.project
    },
    appProjects () {
      return this.$store.getters.projects
    },
    appError () {
      return store.getters.error
    },
    LOADING () {
      return store.getters.loading
    },
    LANG () {
      return this.$store.getters.lang
    },
    TASK_TIMER () {
      return this.$store.getters.taskTimer
    }
  }
}
