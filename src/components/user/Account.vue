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
    <sound-notify-settings v-if="tab === '1'"></sound-notify-settings>
  </div>
</template>

<script>
  import AppRouterName from '../theme/AppRouterName'
  import SoundNotifySettings from './SoundNotifySettings'
  import UserData from './UserData'

export default {
    name: 'Account',
    components: {UserData, SoundNotifySettings, AppRouterName},
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
