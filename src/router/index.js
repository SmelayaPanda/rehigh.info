import Vue from 'vue'
import Router from 'vue-router'
// AUTH
import AuthGuard from './auth-guard'
import SignIn from '@/components/auth/SignIn'
import SignUp from '@/components/auth/SignUp'
// PROJECT
import AppHome from '@/components/AppHome'
import Task from '@/components/task/Task'
import Documents from '@/components/documents/Documents'
import Contacts from '@/components/contacts/Contacts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome
    },
    {
      path: '/task',
      name: 'task',
      component: Task,
      beforeEnter: AuthGuard
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
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    }
  ]
})
