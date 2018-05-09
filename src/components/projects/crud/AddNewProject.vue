<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Add new project</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="createNewProject">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Re:High Studio</v-list-tile-title>
              <v-list-tile-sub-title>New project creation</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-container id="task_form">
          <v-layout row wrap justify-space-between>
            <v-flex xs6 class="pr-2">
              <v-text-field
                label="Title"
                v-model="project.title"
                :rules="[(v) => v.length <= 32 || 'Max 32 characters']"
                :counter="32">
              </v-text-field>
            </v-flex>
            <v-flex xs6 class="pl-2">
              <v-text-field
                label="Subtitle"
                v-model="project.subtitle"
                :rules="[(v) => v.length <= 32 || 'Max 32 characters']"
                :counter="32">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Description"
                v-model="project.description"
                :rules="[(v) => v.length <= 2048 || 'Max 2048 characters']"
                :counter="2048"
                multi-line
                :rows="3">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select
                v-model="project.type"
                :items="PROJECT_TYPES"
                label="Project type"
                chips
                tags
                deletable-chips
                autocomplete
                multiple>
              </v-select>
            </v-flex>
            <v-flex xs12>
              <v-select
                v-model="emailList"
                label="Access emails"
                chips
                deletable-chips
                autocomplete
                tags
                multiple>
              </v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'AddNewProject',
    data () {
      return {
        dialog: false,
        project: {
          title: '',
          subtitle: '',
          description: '',
          type: '',
          history: {
            created: new Date().getTime()
          }
        },
        emailList: [ // emails which have access to project
          'smelayapandagm@gmail.com',
          'vika.erika@gmail.com'
        ]
      }
    },
    methods: {
      createNewProject () {
        this.dialog = false
        let emails = {}
        this.emailList.forEach(el => {
          emails[el] = true
        })
        this.project.emails = emails
        this.$store.dispatch('addNewProject', this.project)
      }
    },
    created () {
      this.$bus.$on('openAddNewProjectDialog', () => {
        this.dialog = true
      })
    }
  }
</script>

<style scoped>
  #task_form {
    margin-top: -20px;
  }
</style>
