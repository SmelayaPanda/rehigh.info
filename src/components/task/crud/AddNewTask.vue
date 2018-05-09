<template>
  <v-layout row justify-center v-if="appProject" :key="appProject.id">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Add new task</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="addNewTask">Save</v-btn>
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
            <v-flex xs12>
              <v-text-field
                label="Title"
                v-model="task.title"
                :rules="[(v) => v.length <= 128 || 'Max 128 characters']"
                :counter="128">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Description"
                v-model="task.description"
                :rules="[(v) => v.length <= 2048 || 'Max 2048 characters']"
                :counter="2048"
                multi-line
                :rows="2">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select
                v-model="task.type"
                :items="TASK_TYPES"
                label="Task type"
                chips
                deletable-chips
                autocomplete
                multiple>
              </v-select>
            </v-flex>
            <v-flex xs12 sm4 md2 lg2 xl2>
              <span class="info--text">Priority</span>
              <v-radio-group v-model="task.priority">
                <v-radio :label="TASK_PRIORITY.low.value" :value="TASK_PRIORITY.low.value"
                         color="success"></v-radio>
                <v-radio :label="TASK_PRIORITY.middle.value" :value="TASK_PRIORITY.middle.value"
                         color="primary"></v-radio>
                <v-radio :label="TASK_PRIORITY.high.value" :value="TASK_PRIORITY.high.value"
                         color="error"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 sm4 md3 lg2 xl2>
              <v-text-field
                label="Price"
                v-model="task.price.amount"
                :suffix="task.price.currency"
                type="number">
              </v-text-field>
              <v-text-field
                label="Plan time"
                v-model="task.time.plan"
                suffix="hours"
                type="number">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md3 lg2 xl2>
              <p class="info--text">Deadline</p>
              <el-date-picker
                v-model="task.deadline"
                type="date"
                placeholder="Pick a Date"
                :clearable="false"
                format="yyyy/MM/dd"
                value-format="timestamp">
              </el-date-picker>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'AddNewTask',
    data () {
      return {
        dialog: false,
        task: {
          title: '',
          description: '',
          priority: '',
          payment: {amount: 0, currency: 'RUB'},
          price: {amount: 3000, currency: 'RUB'},
          type: '',
          time: {plan: 8, real: 0},
          deadline: new Date().getTime(),
          history: {created: ''},
          status: 'created',
          creator: {userId: ''}
        }
      }
    },
    methods: { // TODO: add comments to task (userId, text, date)
      addNewTask () {
        this.dialog = false
        this.task.creator.userId = this.appUser.uid
        this.task.history.created = new Date().getTime()
        this.task.projectId = this.appProject.id
        this.$store.dispatch('addNewTask', this.task)
          .then(() => { // clear
            // this.task = {
            //   title: '',
            //   description: '',
            //   priority: '',
            //   payment: {amount: 0, currency: 'RUB'},
            //   price: {amount: 3000, currency: 'RUB'},
            //   type: '',
            //   time: {plan: 8, real: 0},
            //   deadline: new Date().getTime(),
            //   history: {created: ''},
            //   status: 'created',
            //   creator: {userId: ''}
            // }
          })
      }
    },
    created () {
      this.$bus.$on('openAddNewTaskDialog', () => {
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
