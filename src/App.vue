<template>
  <v-app>
    <div v-if="this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm'">
      <no-mobile></no-mobile>
    </div>
    <div v-else>
      <app-nav-menu/>
      <app-toolbar/>
      <v-content>
        <router-view/>
      </v-content>
      <app-notifications/>
      <app-help></app-help>
    </div>
  </v-app>
</template>

<script>
  import AppNavMenu from './components/AppNavMenu'
  import AppToolbar from './components/AppToolbar'
  import AppNotifications from './components/notifications/AppNotifications'
  import AppHelp from './components/help/AppHelp'
  import NoMobile from './components/NoMobile'

export default {
    components: {NoMobile, AppHelp, AppToolbar, AppNavMenu, AppNotifications},
    data () {
      return {
        rightDrawer: false
      }
    },
    name: 'App'
  }
</script>
