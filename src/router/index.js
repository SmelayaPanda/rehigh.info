import Vue from 'vue'
import Router from 'vue-router'
import Task from '@/components/task/Task'
import Documents from '@/components/documents/Documents'
import Contacts from '@/components/contacts/Contacts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/task',
      name: 'task',
      component: Task
    },
    {
      path: '/documents',
      name: 'documents',
      component: Documents
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    }
  ]
})
