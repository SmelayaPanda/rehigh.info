<template>
  <div>
    <app-router-name :name="msg.account[LANG]" style="margin-bottom: 50px;">
      <v-tabs
        v-model="tab"
        @input="changeTab"
        dark color="primary"
        slider-color="white"
        class="mt-3">
        <v-tab v-for="tab in tabs" :key="tab.en">
          <span class="pl-3 pr-3">{{ tab[LANG] }}</span>
        </v-tab>
      </v-tabs>
    </app-router-name>
    <user-data v-if="tab === '0'"/>
    <Notifications v-if="tab === '1'"/>
  </div>
</template>

<script>
  import AppRouterName from '../theme/AppRouterName'
  import Notifications from './Notifications'
  import UserData from './UserData'

export default {
    name: 'Account',
    components: {UserData, Notifications, AppRouterName},
    data () {
      return {
        tab: '0',
        tabs: {
          data: {en: 'Data', ru: 'Данные'},
          notifications: {en: 'notifications', ru: 'Оповещения'},
          other: {en: 'other', ru: 'Другое'}
        },
        msg: {
          account: {en: 'Account', ru: 'Акаунт'}
        }
      }
    },
    methods: {
      changeTab (val) {
        console.log(val)
      }
    }
  }
</script>

<style scoped>

</style>
