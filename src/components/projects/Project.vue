<template>
  <v-container>
    <v-layout row class="secondary--text">
      <v-flex xs12 sm11 md10 lg7 xl7>
        <v-container v-if="!USER">
          <h2>{{ msg.login[LANG] }}</h2>
        </v-container>
        <div v-else>
          <v-container v-if="PROJECT">
            <h1>{{ PROJECT.title }}</h1>
            <h2>{{ PROJECT.subtitle }}</h2>
            <div v-html="PROJECT.description"></div>
            <div style="margin-left: -4px;">
              <v-chip class="mt-3">
                <v-avatar>
                  <v-icon class="secondary--text">date_range</v-icon>
                </v-avatar>
                {{ PROJECT.history.created | date(LANG) }}
              </v-chip>
              <br>
              <v-chip v-for="(value, key) in PROJECT.emails" :key="key">
                <v-avatar>
                  <v-icon class="secondary--text">vpn_lock</v-icon>
                </v-avatar>
                {{ key }}
              </v-chip>
              <br>
              <v-chip v-for="type in PROJECT.type" :key="type">
                <v-avatar>
                  <v-icon class="secondary--text">label</v-icon>
                </v-avatar>
                {{ type }}
              </v-chip>
            </div>
          </v-container>
          <v-container v-else>
            <h1>{{ msg.select[LANG] }}</h1>
          </v-container>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Project',
    data () {
      return {
        msg: {
          select: {en: 'Select a Project', ru: 'Выберите проект'},
          login: {en: 'Login into account ', ru: 'Войдите в аккаунт'}
        }
      }
    }
  }
</script>

<style scoped>

</style>
