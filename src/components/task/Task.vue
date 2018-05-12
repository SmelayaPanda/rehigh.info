<template>
  <div id="task_router" v-if="appRole !== USER_ROLES.guest.val">
    <app-router-name name="Task">
      <el-radio-group
        @change="loadTasks" :disabled="!appProject"
        v-model="status" size="mini" id="task_status_select">
        <el-radio-button v-for="status in TASK_STATUSES" :key="status.val" :label="status.val">
          {{ status.en }}
        </el-radio-button>
      </el-radio-group>
      <v-icon
        v-if="appRole === USER_ROLES.admin.val || appRole === USER_ROLES.developer.val"
        @click="$bus.$emit('openAddNewTaskDialog')"
        id="add_new_task" medium>playlist_add
      </v-icon>
      <create-update-task/>
    </app-router-name>
    <task-table v-if="appProject"/>
  </div>
</template>

<script>
  import TaskTable from './TaskTable'
  import AppRouterName from '../theme/AppRouterName'
  import CreateUpdateTask from './crud/CreateUpdateTask'

  export default {
    name: 'Task',
    components: {CreateUpdateTask, AppRouterName, TaskTable},
    data () {
      return {
        status: 'created'
      }
    },
    methods: {
      loadTasks (val) {
        this.$store.dispatch('setTaskStatus', val)
        this.$store.dispatch('fetchTasks')
      }
    },
    created () {
      if (this.appProject) {
        this.loadTasks(this.status)
      }
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
