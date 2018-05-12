<template>
  <div>
    <app-router-name :name="msg.contacts[LANG]"/>
  </div>
</template>

<script>
  import AppRouterName from '../theme/AppRouterName'

  export default {
    name: 'contacts',
    components: {AppRouterName},
    data () {
      return {
        msg: {
          contacts: {en: 'Contacts', ru: 'Контакты'}
        }
      }
    }
  }
</script>

<style scoped>

</style>
