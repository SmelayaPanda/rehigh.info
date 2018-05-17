<template>
  <v-layout row justify-center v-if="appProject" :key="appProject.id">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ operation.title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="saveTask">Save</v-btn>
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
            <div style="height: 300px">
            <quill-editor v-model="task.description"
                          ref="myQuillEditor"
                          :options="editorOption">
            </quill-editor>
            </div>
            <v-flex xs12>
              <v-select
                v-model="task.type"
                :items="TASK_TYPES"
                label="Task type"
                chips
                deletable-chips
                tags
                autocomplete
                multiple>
              </v-select>
            </v-flex>
            <v-flex xs12 sm4 md2 lg2 xl2>
              <span class="info--text">Priority</span>
              <v-radio-group v-model="task.priority">
                <v-radio :label="TASK_PRIORITY.low.en" :value="TASK_PRIORITY.low.val"
                         color="success"></v-radio>
                <v-radio :label="TASK_PRIORITY.middle.en" :value="TASK_PRIORITY.middle.val"
                         color="primary"></v-radio>
                <v-radio :label="TASK_PRIORITY.high.en" :value="TASK_PRIORITY.high.val"
                         color="error"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 sm4 md3 lg2 xl2>
              <v-text-field
                label="Price"
                @input="calcHours"
                v-model="task.price.amount"
                :suffix="task.price.currency"
                type="number">
              </v-text-field>
              <v-text-field
                label="Payment per hours"
                @input="calcHours"
                v-model="paymentPerHours"
                suffix="RUB/hour"
                type="number">
              </v-text-field>
              <v-text-field
                label="Plan time"
                v-model="task.time.plan"
                suffix="hours"
                type="number"
                disabled>
              </v-text-field>
              <v-text-field
                label="Payment"
                v-model="task.payment.amount"
                :suffix="task.payment.currency"
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
  import { quillEditor } from 'vue-quill-editor'
  let initTask = {
    title: '',
    description: '',
    priority: 'middle',
    payment: {amount: 0, currency: 'RUB'},
    price: {amount: 3000, currency: 'RUB'},
    type: [],
    time: {plan: 8, real: 0},
    deadline: new Date().getTime(),
    history: {created: ''},
    status: 'created',
    creator: {userId: ''}
  }
  let newTask = Object.assign({}, initTask)
  export default {
    name: 'CreateUpdateTask',
    components: {
      quillEditor
    },
    data () {
      return {
        dialog: false,
        operation: {
          title: '',
          name: ''
        },
        editorOption: {
          // some quill options
        },
        task: newTask,
        paymentPerHours: 400
      }
    },
    methods: { // TODO: add comments to task (userId, text, date)
      saveTask () {
        this.dialog = false
        this.task.payment.amount = Number(this.task.payment.amount)
        this.task.price.amount = Number(this.task.price.amount)
        if (this.operation.name === 'add') {
          this.task.creator.userId = this.appUser.uid
          this.task.history.created = new Date().getTime()
          this.task.projectId = this.appProject.id
          this.$store.dispatch('addNewTask', this.task)
            .then(() => { // clear
              this.task = initTask
            })
        } else {
          delete this.task.status // edit operation
          this.$store.dispatch('updateTask', this.task)
            .then(() => { // clear
              this.task = initTask
            })
        }
      },
      close () {
        this.dialog = false
        this.task = initTask
      },
      calcHours () {
        this.task.time.plan = this.task.price.amount / this.paymentPerHours
      }
    },
    created () {
      this.$bus.$on('openAddNewTaskDialog', () => {
        this.operation.name = 'add'
        this.operation.title = 'Add new task'
        this.dialog = true
      })
      this.$bus.$on('openEditTaskDialog', (id) => {
        this.task = this.$store.getters.tasks[id]
        this.operation.name = 'edit'
        this.operation.title = 'Edit task'
        this.dialog = true
      })
      this.calcHours(this.task.price.amount)
    }
  }
</script>

<style scoped>
  #task_form {
    margin-top: -20px;
  }
</style>
