<template>
  <div>
    <app-router-name name="Task"/>
    <task-table></task-table>
  </div>
</template>

<script>
  import TaskTable from './TaskTable'
  import AppRouterName from '../theme/AppRouterName'

export default {
    name: 'Task',
    components: {AppRouterName, TaskTable}
  }
</script>

