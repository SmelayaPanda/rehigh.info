import Vue from 'vue'
import Router from 'vue-router'
import Task from '@/components/task/Task'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/task',
      name: 'task',
      component: Task
    }
  ]
})
