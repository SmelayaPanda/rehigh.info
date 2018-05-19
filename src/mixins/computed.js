import {store} from '../store'

export const computed = {
  computed: {
    USER () {
      return store.getters.user
    },
    ROLE () {
      return store.getters.role
    },
    PROJECT () {
      return this.$store.getters.project
    },
    PROJECTS () {
      return this.$store.getters.projects
    },
    ERROR () {
      return store.getters.error
    },
    LOADING () {
      return store.getters.loading
    },
    LANG () {
      return this.$store.getters.lang
    },
    TIMER () {
      return this.$store.getters.timer
    }
  }
}
