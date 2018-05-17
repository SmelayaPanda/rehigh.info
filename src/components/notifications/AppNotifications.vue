<template>
  <v-navigation-drawer
    temporary
    right
    v-model="isOpened"
    fixed
    width="400"
    app>
    <v-list>
      <v-list-tile class="secondary white--text">
        <v-list-tile-action>
          <v-icon class="white--text">history</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>{{ msg.notify[LANG] }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-container>
      <p v-if="!appProject">
        {{ msg.select[LANG] }}
      </p>
      <v-layout flex wpar v-for="event in notifications" :key="event.date">
        <v-card class="event_card">
          <p class="event_date">{{ event.date | date(LANG) }}</p>
          <p>{{ event.msg }}</p>
        </v-card>
      </v-layout>
    </v-container>
  </v-navigation-drawer>
</template>
<script>
  export default {
    name: 'app-notifications',
    data () {
      return {
        isOpened: false,
        msg: {
          notify: {en: 'Notifications History', ru: 'История оповещений'},
          select: {en: 'Select a Project', ru: 'Выберите проект'}
        }
      }
    },
    computed: {
      notifications () {
        return this.$store.getters.notifications ? this.$store.getters.notifications.reverse() : []
      }
    },
    created () {
      this.$bus.$on('openNotifications', () => {
        this.isOpened = !this.isOpened
      })
    }
  }
</script>

<style scoped lang="scss">
  .event_card {
    padding: 0 15px;
    width: 100%;
    margin: 5px;
  }

  .event_date {
    color: $color-info;
    text-align: right;
    font-size: 11px;
    margin-bottom: 2px;
    padding-top: 5px;
  }
</style>
