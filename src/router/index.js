import Vue from 'vue'
import Router from 'vue-router'
// AUTH
import AuthGuard from './auth-guard'
import Signin from '@/components/auth/Signin'
import Signup from '@/components/auth/Signup'
// PROJECT
import AppHome from '@/components/AppHome'
import Project from '@/components/projects/Project'
import Task from '@/components/task/Task'
import Documents from '@/components/documents/Documents'
import Contacts from '@/components/contacts/Contacts'
import System from '@/components/system/System'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome,
      beforeEnter: AuthGuard
    },
    {
      path: '/project',
      name: 'project',
      component: Project,
      beforeEnter: AuthGuard
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
      path: '/system',
      name: 'system',
      component: System
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})
