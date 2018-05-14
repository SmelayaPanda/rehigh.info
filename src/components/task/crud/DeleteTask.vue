<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card  v-if="task" id="remove_task_card">
        <v-card-title class="headline">{{ msg.removeTask[LANG] }}</v-card-title>
        <v-card-text>
          <span v-if="task.payment.amount">
            Вы не можете удалить задачу:
            ИД <el-tag type="success" size="small">{{ task.id }}</el-tag>
            "{{ task.title }}" так по ней существует оплата
          </span>
          <span v-else>
            Вы действительно хотите удалить:
            ИД <el-tag type="success" size="small">{{ task.id }}</el-tag> "{{ task.title }}"</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="dialog = false">{{ msg.cancel[LANG] }}</v-btn>
          <v-btn
            @click.native="save"
            :disabled="task.payment.amount !== 0"
            color="green darken-1" flat>{{ msg.remove[LANG] }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'DeleteTask',
    data () {
      return {
        dialog: false,
        task: '',
        msg: {
          remove: {en: 'Remove', ru: 'Удалить'},
          cancel: {en: 'Cancel', ru: 'Отмена'},
          removeTask: {en: 'Remove the task?', ru: 'Удалить задачу?'}
        }
      }
    },
    methods: {
      save () {
        this.dialog = false
        this.$store.dispatch('deleteTask', this.task.id)
      }
    },
    computed: {},
    created () {
      this.$bus.$on('openDeleteTaskDialog', (id) => {
        this.dialog = true
        this.task = this.$store.getters.tasks[id]
      })
    }
  }
</script>

<style scoped>
  #remove_task_card {
    padding: 10px;
  }
</style>
