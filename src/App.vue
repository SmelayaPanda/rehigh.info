<template>
  <v-app>
    <div v-if="$vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm'">
      <no-mobile></no-mobile>
    </div>
    <div v-else>
      <div v-if="!appUser">
        <signin v-if="$route.path === '/signin'"/>
        <signup v-if="$route.path === '/signup'"/>
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
    </div>
  </v-app>
</template>

<script>
  import AppNavMenu from './components/AppNavMenu'
  import AppToolbar from './components/AppToolbar'
  import AppNotifications from './components/notifications/AppNotifications'
  import AppHelp from './components/help/AppHelp'
  import NoMobile from './components/NoMobile'
  import Signin from './components/auth/Signin'
  import Signup from './components/auth/Signup'

export default {
    components: {Signup, Signin, NoMobile, AppHelp, AppToolbar, AppNavMenu, AppNotifications},
    data () {
      return {
        rightDrawer: false
      }
    },
    name: 'App'
  }
</script>
