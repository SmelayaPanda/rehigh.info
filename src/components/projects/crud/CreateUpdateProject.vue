<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title v-if="operation">{{ msg[operation][LANG] }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="save">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ appProject.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ appProject.subtitle }}</v-list-tile-sub-title>
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
              <div id="quill_wrap">
                <quill-editor
                  v-model="project.description"
                  :options="editorOption"
                  ref="projectDescrQuill">
                </quill-editor>
              </div>
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
  let initProject = {
    title: '',
    subtitle: '',
    description: '',
    type: ''
  }
  let newProject = Object.assign({}, initProject)
  export default {
    name: 'AddNewProject',
    data () {
      return {
        dialog: false,
        operation: '',
        project: newProject,
        emailList: [ // emails which have access to project
          'smelayapandagm@gmail.com',
          'vika.erika@gmail.com'
        ],
        editorOption: {
          // some quill options
        },
        msg: {
          add: {en: 'Add project', ru: 'Добавить проект'},
          edit: {en: 'Edit project', ru: 'Редактировать проект'}
        }
      }
    },
    methods: {
      save () {
        this.dialog = false
        // Array of emails to object for firestore query
        let emails = {}
        this.emailList.forEach(el => {
          emails[el] = true
        })
        this.project.emails = emails
        // Operations
        if (this.operation === 'add') {
          this.project.history = {}
          this.project.history.created = new Date().getTime()
          this.$store.dispatch('addNewProject', this.project)
            .then(() => { // clear
              this.project = initProject
            })
        } else if (this.operation === 'edit') {
          this.$store.dispatch('updateProject', {id: this.project.id, updateData: this.project})
        }
      },
      close () {
        this.dialog = false
        this.project = initProject
      }
    },
    created () {
      this.$bus.$on('openAddNewProjectDialog', () => {
        this.operation = 'add'
        this.dialog = true
      })
      this.$bus.$on('openEditProjectDialog', () => {
        this.operation = 'edit'
        this.project = this.$store.getters.project
        this.dialog = true
      })
    }
  }
</script>

<style scoped>
  #task_form {
    margin-top: -20px;
  }

  #quill_wrap {
    height: auto;
    margin-bottom: 20px;
  }
</style>
