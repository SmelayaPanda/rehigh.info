<template>
  <v-container id="project_select_wrap">
    <v-layout row wrap>
      <v-flex xs10 sm11 md6 lg4 xl4>
        <v-select
          id="project_selector"
          v-model="select"
          @change="switchProject"
          :disabled="!USER || !PROJECTS || ROLE === ROLES.guest.val"
          :items="items"
          :hint="select.subtitle"
          :label="msg.project[LANG]"
          :dark="true"
          min-width="280"
          max-height="300"
          item-text="title"
          item-value="subtitle"
          color="primary"
          single-line
          autocomplete
          return-object
          persistent-hint>
        </v-select>
        <create-update-project/>
      </v-flex>
      <v-flex xs2 sm1 md1 lg1 xl1>
        <v-menu v-if="PROJECT && (ROLE === ROLES.admin.val || ROLE === ROLES.developer.val)" bottom right>
          <v-btn flat fab small id="project_operation_btn" slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile
              v-if="ROLE === ROLES.admin.val"
              @click="$bus.$emit('openEditProjectDialog', PROJECT.id)">
              <v-list-tile-title>{{ msg.edit[LANG] }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              v-if="ROLE === ROLES.developer.val"
              @click="$bus.$emit('openAddNewProjectDialog')">
              <v-list-tile-title>{{ msg.create[LANG] }}</v-list-tile-title>
            </v-list-tile>
            <!-- TODO: create remove project ? -->
            <v-list-tile
              v-if="ROLE === ROLES.developer.val"
              @click="$bus.$emit('openDeleteProjectDialog', PROJECT.id)">
              <v-list-tile-title>{{ msg.remove[LANG] }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import CreateUpdateProject from './crud/CreateUpdateProject'

  export default {
    name: 'app-project-select',
    components: {CreateUpdateProject},
    data () {
      return {
        select: [],
        msg: {
          project: {en: 'Project', ru: 'Проект'},
          create: {en: 'Create', ru: 'Создать проект'},
          edit: {en: 'Edit', ru: 'Редактировать'},
          remove: {en: 'Remove', ru: 'Удалить'}
        }
      }
    },
    methods: {
      switchProject ({title, subtitle, id}) {
        this.$store.dispatch('setProject', id)
        this.$store.dispatch('fetchTasks', {
          projectId: this.PROJECT.id,
          status: this.$store.getters.taskStatus
        })
      }
    },
    computed: {
      items () {
        let items = []
        if (this.PROJECTS) {
          for (let id in this.PROJECTS) {
            if (this.PROJECTS[id].emails[this.USER.email]) {
              items.push({
                id: id,
                title: this.PROJECTS[id].title,
                subtitle: this.PROJECTS[id].subtitle
              })
              // INITIAL LOAD: auto-select last project for admin
              if (this.ROLE === 'admin' && this.TIMER && this.TIMER.task && this.TIMER.task.projectId === id) {
                this.select = {
                  id: id,
                  title: this.PROJECTS[id].title,
                  subtitle: this.PROJECTS[id].subtitle
                }
                if (!this.PROJECT) {
                  this.$store.dispatch('setProject', id)
                  this.$store.dispatch('fetchTasks', { // auto open last task from timer
                    projectId: this.PROJECT.id,
                    status: this.TIMER.task.status
                  })
                  this.$store.commit('setTaskStatus', this.TIMER.task.status)
                }
              }
            }
          }
          if (items.length && this.ROLE === 'client') { // auto select project for client
            this.select = {
              title: items[0].title,
              subtitle: items[0].subtitle,
              id: items[0].id
            }
            this.$store.dispatch('setProject', items[0].id)
          }
        }
        items.sort((a, b) => a.title > b.title)
        return items
      }
    }
  }
</script>

<style type="text/css">
  #project_select_wrap {
    padding-top: 5px;
  }

  #project_operation_btn {
    margin-left: 20px;
    color: white;
    margin-top: 10px;
  }
</style>
