<template>
  <div id="task_router">
    <app-router-name name="Task">
      <el-radio-group @change="loadTasks" v-model="status" size="mini" id="task_status_select">
        <el-radio-button v-for="status in TASK_STATUSES" :key="status.value" :label="status.value"/>
      </el-radio-group>
      <v-icon @click="$bus.$emit('openAddNewTaskDialog')" id="add_new_task" medium>playlist_add</v-icon>
      <add-new-task/>
    </app-router-name>
    <task-table/>
  </div>
</template>

<script>
  import TaskTable from './TaskTable'
  import AppRouterName from '../theme/AppRouterName'
  import AddNewTask from './crud/AddNewTask'

  export default {
    name: 'Task',
    components: {AddNewTask, AppRouterName, TaskTable},
    data () {
      return {
        status: 'pending'
      }
    },
    methods: {
      loadTasks () {
        this.$store.dispatch('setTaskStatus', this.status)
        this.$store.dispatch('fetchTasks')
      }
    },
    created () {
      this.$bus.$on('changeTaskStatus', status => {
        this.status = status
      })
    }
  }
</script>

<style type="text/css" lang="scss">
  #task_router {
  }

  #task_status_select {
    margin-bottom: 7px;
  }

  #add_new_task {
    color: white;
    margin-left: 15px;
    margin-bottom: 3px;
  }

  #add_new_task:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
</style>
