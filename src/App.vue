<template>
  <v-app>
    <app-nav-menu/>
    <app-toolbar/>
    <v-content>
      <router-view/>
    </v-content>
    <notifications/>
  </v-app>
</template>

<script>
  import AppNavMenu from './components/AppNavMenu'
  import Notifications from './components/notifications/Notifications'
  import AppToolbar from './components/AppToolbar'

export default {
    components: {AppToolbar, Notifications, AppNavMenu},
    data () {
      return {
        rightDrawer: false
      }
    },
    name: 'App'
  }
</script>

