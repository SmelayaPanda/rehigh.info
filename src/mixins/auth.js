import {store} from '../store'

export const authMixin = {
  computed: {
    isAdmin: function () {
      return store.getters.isAdmin
    },
    isAnonymousUser: function () {
      if (store.getters.user) {
        return store.getters.user.isAnonymous
      }
    }
  }
}
