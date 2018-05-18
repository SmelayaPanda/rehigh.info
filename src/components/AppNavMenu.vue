<template>
  <v-navigation-drawer
    persistent
    :mini-variant="miniVariant"
    :clipped="false"
    v-model="isOpened"
    class="secondary elevation-7"
    width="280"
    hide-overlay
    stateless
    fixed
    app>
    <v-progress-linear
      v-if="LOADING"
      :indeterminate="LOADING"
      height="3"
      color="primary"
      id="app_loading">
    </v-progress-linear>
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
      <v-list-tile v-for="i in items" :key="i.router" @click="$router.push(i.router)">
        <v-list-tile-action>
          <v-icon class="primary--text mb-1">{{ i.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="body-2">{{ i.title[LANG] }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon class="primary--text mb-1">timer</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="body-2">{{ msg.timer[LANG] }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      {{TASK_TIMER}}
    </v-list>
    <v-card flat id="bottom_nav">
      <v-bottom-nav :value="true" :active.sync="bottomNav" absolute color="transparent">
        <v-btn @click="$bus.$emit('openHelp')" flat color="primary" value="help">
          <span class="white--text">{{ msg.help[LANG] }}</span>
          <v-icon>help</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>
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
          {title: {en: 'PROJECT', ru: 'ПРОЕКТ'}, router: '/project', icon: 'settings_ethernet'},
          {title: {en: 'TASK', ru: 'ЗАДАЧИ'}, router: '/task', icon: 'whatshot'},
          {title: {en: 'DOCUMENTS', ru: 'ДОКУМЕНТЫ'}, router: '/documents', icon: 'insert_drive_file'},
          {title: {en: 'CONTACTS', ru: 'КОНТАКТЫ'}, router: '/contacts', icon: 'perm_contact_calendar'}
        ],
        bottomNav: '',
        msg: {
          help: {en: 'Help', ru: 'Помощь'},
          timer: {en: 'Time-manager', ru: 'Тайм-менеджер'}
        }
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
    margin-top: 24px;
    margin-bottom: 8px;
  }

  #app_loading {
    margin: 0;
    padding: 0;
    position: absolute;
  }

  #bottom_nav {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
</style>
