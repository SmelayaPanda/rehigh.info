<template>
  <div id="task_router" v-if="appRole !== ROLES.guest.val">
    <app-router-name :name="title[LANG]">
      <el-radio-group
        @change="loadTasks" :disabled="!appProject"
        v-model="status" size="mini" id="task_status_select">
        <el-radio-button v-for="status in TASK_STATUSES" :key="status.val" :label="status.val">
          {{ status[LANG] }}
        </el-radio-button>
      </el-radio-group>
      <v-btn
        v-if="appRole === ROLES.admin.val"
        @click="$bus.$emit('openAddNewTaskDialog')"
        flat fab small class="ml-3">
        <v-icon class="white--text ml-1" medium>playlist_add</v-icon>
      </v-btn>
    </app-router-name>
    <task-table v-if="appProject"/>
    <create-update-task/>
    <change-task-status/>
    <delete-task/>
  </div>
</template>

<script>
  import TaskTable from './TaskTable'
  import AppRouterName from '../theme/AppRouterName'
  import CreateUpdateTask from './crud/CreateUpdateTask'
  import ChangeTaskStatus from './crud/ChangeTaskStatus'
  import DeleteTask from './crud/DeleteTask'

export default {
    name: 'Task',
    components: {DeleteTask, ChangeTaskStatus, CreateUpdateTask, AppRouterName, TaskTable},
    data () {
      return {
        title: {en: 'Task', ru: 'Задачи'},
        status: 'created'
      }
    },
    methods: {
      loadTasks (val) {
        this.$store.dispatch('fetchTasks', {projectId: this.appProject.id, status: val})
      }
    },
    created () {
      if (this.appProject) {
        this.loadTasks(this.status)
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  #task_router {
  }

  #task_status_select {
    margin-bottom: 7px;
  }
</style>
