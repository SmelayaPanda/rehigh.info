<template>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <v-container v-if="appProject">
            <h1>{{ appProject.title }}</h1>
            <h2>{{ appProject.subtitle }}</h2>
            <p>{{ appProject.description }}</p>
            <v-chip v-for="type in appProject.type" v-bind:key="type">{{ type }}</v-chip>
          </v-container>
          <v-container v-else>
            <h1 class="info--text">Select a Project</h1>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'AppHome'
  }
</script>

<style scoped>

</style>
