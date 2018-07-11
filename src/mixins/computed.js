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
      return store.getters.project
    },
    PROJECTS () {
      return store.getters.projects
    },
    ERROR () {
      return store.getters.error
    },
    LOADING () {
      return store.getters.loading
    },
    LANG () {
      return store.getters.lang
    },
    TIMER () {
      return store.getters.timer
    }
  }
}
