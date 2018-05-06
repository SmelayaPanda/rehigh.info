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
  import AppToolbar from './components/AppToolbar'
  import Notifications from './components/notifications/Notifications'

export default {
    components: {AppToolbar, AppNavMenu, Notifications},
    data () {
      return {
        rightDrawer: false
      }
    },
    name: 'App'
  }
</script>

