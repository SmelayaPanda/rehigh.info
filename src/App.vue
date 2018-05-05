<template>
  <v-app>
    <app-nav-menu :mini-variant="miniVariant"/>
    <v-toolbar app :clipped-left="false" class="primary white--text">
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" class="white--text"></v-icon>
      </v-btn>
      <project-select/>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="$bus.$emit('openNotifications')">
        <v-icon class="white--text">notifications_none</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <notifications/>
  </v-app>
</template>

<script>
  import AppNavMenu from '@/components/AppNavMenu'
  import ProjectSelect from '@/components/ProjectSelect'
  import Notifications from '@/components/Notifications'

export default {
    components: {Notifications, ProjectSelect, AppNavMenu},
    data () {
      return {
        miniVariant: false,
        rightDrawer: false
      }
    },
    name: 'App'
  }
</script>

