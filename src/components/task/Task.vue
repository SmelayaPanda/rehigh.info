<template>
  <div id="task_router" v-if="ROLE !== ROLES.guest.val">
    <app-router-name :name="''">
      <el-radio-group
        @change="loadTasks" :disabled="!PROJECT"
        v-model="status" size="mini" id="task_status_select">
        <el-radio-button v-for="status in TASK_STATUSES" :key="status.val" :label="status.val">
          {{ status[LANG] }}
        </el-radio-button>
      </el-radio-group>
      <v-btn
        v-if="ROLE === ROLES.admin.val"
        @click="$bus.$emit('openAddNewTaskDialog')"
        flat fab small class="ml-3">
        <v-icon class="white--text ml-1" medium>playlist_add</v-icon>
      </v-btn>
    </app-router-name>
    <task-table v-if="PROJECT"/>
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
        status: 'process'
      }
    },
    methods: {
      loadTasks (val) {
        this.$store.dispatch('fetchTasks', {projectId: this.PROJECT.id, status: val})
      }
    },
    computed: {
      storeTaskStatus () {
        return this.$store.getters.taskStatus
      }
    },
    watch: {
      storeTaskStatus (val) {
        this.status = val
      }
    },
    created () {
      if (this.PROJECT) {
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
    margin-left: -12px;
  }
</style>
