<template>
  <v-flex xs9 sm8 md5 lg3 xl3>
    <v-select
      id="project_selector"
      v-model="select"
      @change="switchProject"
      :disabled="!appUser || !appProjects || appRole === ROLES.guest.val"
      :items="items"
      :hint="select.subtitle"
      :label="msg.project[LANG]"
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
        select: [],
        msg: {
          project: {en: 'Project', ru: 'Проект'}
        }
      }
    },
    methods: {
      switchProject ({title, subtitle, id}) {
        if (id === -1) {
          this.$bus.$emit('openAddNewProjectDialog')
        } else {
          this.$store.dispatch('setProject', id)
          this.$store.dispatch('setTaskStatus', this.TASK_STATUSES.created.val)
          this.$bus.$emit('changeTaskStatus', this.TASK_STATUSES.created.val)
          this.$store.dispatch('fetchTasks')
        }
      }
    },
    computed: {
      items () {
        let items = []
        if (this.appRole === 'developer') {
          items.push({title: 'Добавить проект', id: -1}, {divider: true})
        }
        if (this.appProjects) {
          for (let id in this.appProjects) {
            if (this.appProjects[id].emails[this.appUser.email]) {
              items.push({
                id: id,
                title: this.appProjects[id].title,
                subtitle: this.appProjects[id].subtitle
              })
            }
          }
          if (items.length && this.appRole === 'client') { // auto select project for client
            this.select = {
              title: items[0].title,
              subtitle: items[0].subtitle,
              id: items[0].id
            }
            this.$store.dispatch('setProject', items[0].id)
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
