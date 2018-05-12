<template>
  <v-bottom-sheet v-model="sheet">
    <v-list>
      <v-container class="secondary--text">
        <task-help v-if="this.$router.currentRoute.name === 'task'"/>
        <project-help v-else-if="this.$router.currentRoute.name === 'project'"/>
        <documents-help v-else-if="this.$router.currentRoute.name === 'documents'"/>
        <p v-else>{{ msg.absent[LANG] }}</p>
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
        sheet: false,
        msg: {
          absent: {ru: 'Документация отсутствует', en: 'No documentation'}
        }
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
