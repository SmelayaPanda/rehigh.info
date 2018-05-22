<template>
  <v-container align-start>
    <v-layout row class="secondary--text">
      <v-flex xs12 sm12 md8 lg7 xl6>
        {{ msg.id[LANG] }}: <el-tag size="small" type="success">{{ USER.uid }}</el-tag> <br>
        {{ msg.email[LANG] }}: {{ USER.email }} <br>
        {{ msg.firstname[LANG] }}: {{ USER.firstname }} <br>
        {{ msg.lastname[LANG] }}: {{ USER.lastname }} <br>
        {{ msg.nickname[LANG] }}: {{ USER.nickname }} <br>
        {{ msg.lang[LANG] }}: {{ USER.lang }} <br>
        {{ msg.roles[LANG] }}: {{ USER.roles }} <br>
        {{ msg.emailVerified[LANG] }}: {{ USER.emailVerified }} <br>
        {{ msg.creationTime[LANG] }}: {{ USER.metadata.creationTime }} <br>
        {{ msg.lastSignInTime[LANG] }}: {{ USER.metadata.lastSignInTime }} <br>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'UserData',
    data () {
      return {
        msg: {
          id: {en: 'ID', ru: 'ИД'},
          email: {en: 'Email', ru: 'Почта'},
          firstname: {en: 'Firstname', ru: 'Имя'},
          lastname: {en: 'Lastname', ru: 'Фамилия'},
          nickname: {en: 'Nickname', ru: 'Ник'},
          lang: {en: 'Language', ru: 'Язык'},
          roles: {en: 'Roles', ru: 'Роли'},
          emailVerified: {en: 'Email is verified', ru: 'Почта верифицирована'},
          creationTime: {en: 'Creation Time', ru: 'Время создания'},
          lastSignInTime: {en: 'Last Sign In Time', ru: 'Последний вход'}
        }
      }
    }
  }
</script>

<style scoped>

</style>
