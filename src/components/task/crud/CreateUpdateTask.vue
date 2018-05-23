<template>
  <v-layout row justify-center v-if="PROJECT" :key="PROJECT.id">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ msg[operation][LANG] }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="saveTask">{{ msg.save[LANG] }}</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ PROJECT.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ PROJECT.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-container id="task_form">
          <v-layout row wrap justify-space-between>
            <v-flex xs12>
              <v-switch :label="msg.hidden[LANG]" v-model="task.hidden" color="primary"></v-switch>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                :label="msg.title[LANG]"
                v-model="task.title"
                :rules="[(v) => v.length <= 128 || 'Max 128 characters']"
                :counter="128">
              </v-text-field>
            </v-flex>
            <div id="quill_wrap">
              <quill-editor
                v-model="task.description"
                :options="editorOption"
                ref="taskDescrQuill">
              </quill-editor>
            </div>
            <v-flex xs12>
              <v-select
                v-model="task.type"
                :items="TASK_TYPES"
                :label="msg.taskType[LANG]"
                chips
                deletable-chips
                tags
                autocomplete
                multiple>
              </v-select>
            </v-flex>
            <v-flex xs12 sm4 md2 lg2 xl2>
              <span class="info--text">{{ msg.priority[LANG] }}</span>
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
                :label="msg.price[LANG]"
                @input="calcHours"
                v-model="task.price.amount"
                :suffix="task.price.currency"
                type="number">
              </v-text-field>
              <v-text-field
                :label="msg.payPerHour[LANG]"
                @input="calcHours"
                v-model="paymentPerHours"
                suffix="RUB/hour"
                type="number">
              </v-text-field>
              <v-text-field
                :label="msg.planTime[LANG]"
                v-model="task.time.plan"
                :suffix="msg.hours[LANG]"
                type="number"
                disabled>
              </v-text-field>
              <v-text-field
                :label="msg.payment[LANG]"
                v-model="task.payment.amount"
                :suffix="task.payment.currency"
                @change="paymentChange"
                type="number">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md3 lg2 xl2>
              <p class="info--text">{{ msg.deadline[LANG] }}</p>
              <el-date-picker
                v-model="task.deadline"
                type="date"
                :placeholder="msg.pickDate[LANG]"
                :clearable="false"
                format="yyyy/MM/dd"
                value-format="timestamp">
              </el-date-picker>
              <div class="mt-4">
              <span class="info--text">{{ msg.progress[LANG] }}</span>
              <v-slider v-model="task.progress" thumb-label step="1" ticks></v-slider>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import {quillEditor} from 'vue-quill-editor'

  let initTask = {
    title: '',
    description: '',
    priority: 'middle',
    payment: {amount: 0, currency: 'RUB'},
    price: {amount: 3000, currency: 'RUB'},
    type: [],
    time: {plan: 8, real: 0},
    progress: 1, // 0 - 100
    deadline: new Date().getTime(),
    history: {created: ''},
    status: 'created',
    hidden: true, // !hidden visible for admin only
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
        operation: 'add',
        editorOption: {
          // some quill options
        },
        task: newTask,
        paymentPerHours: 400,
        isChangedPayment: false,
        msg: {
          add: {en: 'Add new task', ru: 'Добавить новую задачу'},
          edit: {en: 'Edit task', ru: 'Редактировать задачу'},
          hidden: {en: 'Hidden', ru: 'Скрытая'},
          save: {en: 'save', ru: 'сохранить'},
          title: {en: 'Title', ru: 'Заголовок'},
          taskType: {en: 'Task type', ru: 'Тип задачи'},
          priority: {en: 'Priority', ru: 'Приоритетность'},
          price: {en: 'Price', ru: 'Стоимость'},
          payPerHour: {en: 'Payment per hours', ru: 'Оплата в час'},
          planTime: {en: 'Plan time', ru: 'Плановое время'},
          hours: {en: 'hours', ru: 'часов'},
          payment: {en: 'Payment', ru: 'Оплачено'},
          pickDate: {en: 'Pick a Date', ru: 'Выберите дату'},
          progress: {en: 'Progress', ru: 'Прогресс'},
          deadline: {en: 'Deadline', ru: 'Дата сдачи'}
        }
      }
    },
    methods: { // TODO: add comments to task (userId, text, date)
      saveTask () {
        this.dialog = false
        this.task.payment.amount = Number(this.task.payment.amount)
        this.task.price.amount = Number(this.task.price.amount)
        this.task.time.plan = Number(this.task.time.plan) * 60 * 60 * 1000
        if (this.operation === 'add') {
          this.task.creator.userId = this.USER.uid
          this.task.history.created = new Date().getTime()
          this.task.projectId = this.PROJECT.id
          this.$store.dispatch('addNewTask', this.task)
            .then(() => { // clear
              this.task = initTask
            })
        } else {
          this.$store.dispatch('updateTask', {
            id: this.task.id,
            isChangedPayment: this.isChangedPayment,
            data: this.task
          })
            .then(() => { // clear
              this.task = initTask
              this.isChangedPayment = false
            })
        }
      },
      close () {
        this.dialog = false
        this.task = initTask
      },
      calcHours () {
        this.task.time.plan = this.task.price.amount / this.paymentPerHours
      },
      paymentChange (val) {
        this.isChangedPayment = true
      }
    },
    created () {
      this.$bus.$on('openAddNewTaskDialog', () => {
        this.operation = 'add'
        this.calcHours()
        this.task = initTask
        this.dialog = true
      })
      this.$bus.$on('openEditTaskDialog', (id) => {
        this.task = this.$store.getters.tasks[id]
        this.operation = 'edit'
        this.calcHours()
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
