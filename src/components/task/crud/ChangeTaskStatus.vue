<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card id="change_status_card">
        <v-card-title class="headline">{{ msg.changeStatus[LANG] }}</v-card-title>
        <v-card-text>
          <v-radio-group v-model="status" column id="user_lang">
            <v-radio
              v-for="status in TASK_STATUSES"
              :key="status.val"
              :label="status[LANG]"
              :value="status.val"
              :disabled="!availableStatus(status.val)"
              color="primary">
            </v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="close">{{ msg.cancel[LANG] }}</v-btn>
          <v-btn
            @click.native="save"
            :disabled="!status"
            color="green darken-1" flat>{{ msg.save[LANG] }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'ChangeTaskStatus',
    data () {
      return {
        dialog: false,
        taskId: '',
        status: '',
        prevStatus: '',
        msg: {
          save: {en: 'Save', ru: 'Сохранить'},
          cancel: {en: 'Cancel', ru: 'Отмена'},
          changeStatus: {en: 'Change task status?', ru: 'Изменить статус задачи?'}
        }
      }
    },
    methods: {
      availableStatus (val) {
        if (this.ROLE === this.ROLES.client.val) {
          if (this.prevStatus === this.TASK_STATUSES.created.val) {
            return val === this.TASK_STATUSES.pending.val
          } else if (this.prevStatus === this.TASK_STATUSES.finished.val) {
            return val === this.TASK_STATUSES.accepted.val
          }
        } else if (this.ROLE === this.ROLES.admin.val) {
          if (this.task && this.task.hidden) { // can switch to any status hidden task
            return true
          }
          if (this.prevStatus === this.TASK_STATUSES.pending.val) {
            return val === this.TASK_STATUSES.process.val ||
              val === this.TASK_STATUSES.finished.val ||
              val === this.TASK_STATUSES.stopped.val
          } else if (this.prevStatus === this.TASK_STATUSES.process.val) {
            return val === this.TASK_STATUSES.finished.val ||
              val === this.TASK_STATUSES.stopped.val
          } else if (this.prevStatus === this.TASK_STATUSES.stopped.val) {
            return val === this.TASK_STATUSES.process.val ||
              val === this.TASK_STATUSES.finished.val
          }
        }
      },
      save () {
        this.dialog = false
        console.log(this.taskId)
        console.log(this.status)
        this.$store.dispatch('updateTask', {
          id: this.taskId,
          status: this.status,
          [`history.${this.status}`]: new Date().getTime()
        })
      },
      close () {
        this.taskId = ''
        this.status = ''
        this.prevStatus = ''
        this.dialog = false
      }
    },
    computed: {
      task () {
        return this.$store.getters.tasks[this.taskId]
      }
    },
    created () {
      this.$bus.$on('openChangeTaskStatusDialog', (id) => {
        this.dialog = true
        this.taskId = id
        this.prevStatus = this.$store.getters.tasks[id].status
      })
    }
  }
</script>

<style scoped>
  #change_status_card {
    padding: 10px;
  }
</style>
