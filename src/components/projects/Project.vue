<template>
  <v-container>
    <v-layout row class="secondary--text">
      <v-flex xs12>
        <v-container v-if="!appUser">
          <h2>{{ msg.login[LANG] }}</h2>
        </v-container>
        <div v-else>
          <v-container v-if="appProject">
            <h1>{{ appProject.title }}</h1>
            <h2>{{ appProject.subtitle }}</h2>
            <p>{{ appProject.description }}</p>
            <v-chip v-for="type in appProject.type" :key="type">{{ type }}</v-chip>
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
