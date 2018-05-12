<template>
  <v-app>
    <app-nav-menu/>
    <app-toolbar/>
    <v-content>
      <router-view/>
    </v-content>
    <app-notifications/>
    <app-help></app-help>
  </v-app>
</template>

<script>
  import AppNavMenu from './components/AppNavMenu'
  import AppToolbar from './components/AppToolbar'
  import AppNotifications from './components/notifications/AppNotifications'
  import AppHelp from './components/help/AppHelp'

export default {
    components: {AppHelp, AppToolbar, AppNavMenu, AppNotifications},
    data () {
      return {
        rightDrawer: false
      }
    },
    name: 'App'
  }
</script>
