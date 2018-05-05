<template>
  <v-navigation-drawer
    temporary
    right
    v-model="isOpened"
    fixed
    app>
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>history</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Notifications History</v-list-tile-title>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>
<script>
  export default {
    name: 'notifications',
    data () {
      return {
        isOpened: false
      }
    },
    created () {
      this.$bus.$on('openNotifications', () => {
        this.isOpened = !this.isOpened
      })
    }
  }
</script>
