<template>
  <v-flex xs9 sm8 md5 lg3 xl3>
    <v-select
      id="project_selector"
      v-model="select"
      @change="switchProject"
      :disabled="!$store.getters.user || !appProjects"
      :items="items"
      :hint="select.subtitle"
      label="Project"
      item-text="title"
      item-value="subtitle"
      color="primary"
      :dark="true"
      single-line
      return-object
      persistent-hint>
    </v-select>
    <add-new-project/>
  </v-flex>
</template>
<script>
  import AddNewProject from './crud/AddNewProject'

  export default {
    name: 'app-project-select',
    components: {AddNewProject},
    data () {
      return {
        select: []
      }
    },
    methods: {
      switchProject ({title, subtitle, id}) {
        if (id === -1) {
          this.$bus.$emit('openAddNewProjectDialog')
        } else {
          this.$store.dispatch('setProject', id)
          this.$store.dispatch('setTaskStatus', this.TASK_STATUSES.created.value)
          this.$store.dispatch('fetchTasks')
        }
      }
    },
    computed: {
      items () {
        let items = []
        if (this.$store.getters.user) { // TODO: developer role only, for each email own project
          items.push({title: 'Добавить проект', id: -1}, {divider: true})
        }
        if (this.appProjects) {
          for (let id in this.appProjects) {
            items.push({
              id: id,
              title: this.appProjects[id].title,
              subtitle: this.appProjects[id].subtitle
            })
          }
        }
        return items
      }
    }
  }
</script>

<style type="text/css">
  #project_selector {
  }
</style>
