<template>
  <v-bottom-sheet v-model="sheet">
    <v-btn slot="activator" color="purple" dark>Click me</v-btn>
    <v-list>
      <v-container class="secondary--text">
        <task-help v-if="this.$router.currentRoute.name === 'task'"/>
        <project-help v-if="this.$router.currentRoute.name === 'project'"/>
        <documents-help v-if="this.$router.currentRoute.name === 'documents'"/>
        <p v-else>Документация отсутствует</p>
      </v-container>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
  import TaskHelp from './routers/TaskHelp'
  import ProjectHelp from './routers/ProjectHelp'
  import DocumentsHelp from './routers/DocumentsHelp'

export default {
    name: 'AppHelp',
    components: {DocumentsHelp, ProjectHelp, TaskHelp},
    data () {
      return {
        sheet: false
      }
    },
    created () {
      this.$bus.$on('openHelp', () => {
        this.sheet = true
      })
    }
  }
</script>

<style scoped>

</style>
