import {store} from '../store'

export const computed = {
  computed: {
    appUser () {
      return store.getters.user
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
    isLoading () {
      return store.getters.loading
    }
  }
}
