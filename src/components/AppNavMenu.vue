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
      <v-list-tile>
        <v-list-tile-action>
          <v-icon class="primary--text">gesture</v-icon>
        </v-list-tile-action>
        <v-list-tile-title class="title">Re:High Studio</v-list-tile-title>
      </v-list-tile>
      <p v-if="!miniVariant" class="work_panel">work panel</p>
      <v-divider></v-divider>
      <v-list-tile v-for="i in items" :key="i.title" @click="">
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
          { title: 'TASK', icon: 'whatshot' },
          { title: 'DOCUMENTS', icon: 'insert_drive_file' },
          { title: 'CONTACTS', icon: 'perm_contact_calendar' }
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
  .work_panel {
    text-align: center;
    font-style: italic;
    margin-top: -6px;
    font-size: 13px;
  }
</style>
