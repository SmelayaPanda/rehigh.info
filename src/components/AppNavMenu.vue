<template>
  <v-navigation-drawer
    persistent
    :mini-variant="miniVariant"
    :clipped="false"
    v-model="isOpened"
    class="secondary"
    width="280"
    hide-overlay
    stateless
    fixed
    app>
    <v-list class="white--text">
      <v-list-tile id="rehigh_title">
        <v-list-tile-action>
          <v-icon class="primary--text">gesture</v-icon>
        </v-list-tile-action>
        <v-list-tile-title class="title">
          <router-link to="/" exact>
            Re:High Studio
          </router-link>
        </v-list-tile-title>
      </v-list-tile>
      <p v-if="!miniVariant" id="work_panel">work panel</p>
      <v-divider></v-divider>
      <v-list-tile v-for="i in items" :key="i.title" @click="$router.push(i.router)">
        <v-list-tile-action>
          <v-icon class="primary--text mb-1">{{ i.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="body-2">{{ i.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
  export default {
    name: 'app-nav-menu',
    data () {
      return {
        isOpened: true,
        miniVariant: false,
        items: [
          {title: 'TASK', router: '/task', icon: 'whatshot'},
          {title: 'DOCUMENTS', router: '/documents', icon: 'insert_drive_file'},
          {title: 'CONTACTS', router: '/contacts', icon: 'perm_contact_calendar'}
        ]
      }
    },
    created () {
      this.$bus.$on('expandNavMenu', () => {
        this.miniVariant = !this.miniVariant
      })
    }
  }
</script>
<style type="text/css">
  #work_panel {
    text-align: center;
    font-style: italic;
    margin-top: -6px;
    margin-bottom: 28px;
    font-size: 13px;
  }

  #rehigh_title {
    margin-top: 22px;
    margin-bottom: 4px;
  }
</style>
