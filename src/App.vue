<template>
  <v-app>
    <app-nav-menu/>
    <app-toolbar/>
    <v-content>
      <router-view/>
    </v-content>
    <app-notifications/>
  </v-app>
</template>

<script>
  import AppNavMenu from './components/AppNavMenu'
  import AppToolbar from './components/AppToolbar'
  import AppNotifications from './components/notifications/AppNotifications'

export default {
    components: {AppToolbar, AppNavMenu, AppNotifications},
    data () {
      return {
        rightDrawer: false
      }
    },
    name: 'App'
  }
</script>
