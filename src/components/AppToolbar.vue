<template>
  <v-toolbar app :clipped-left="false" class="primary white--text">
    <v-btn icon @click.stop="changeToolbarSize">
      <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" class="white--text"></v-icon>
    </v-btn>
    <app-project-select/>
    <v-spacer></v-spacer>
    <v-btn icon @click.stop="$bus.$emit('openNotifications')">
      <v-icon class="white--text">notifications_none</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
  import AppProjectSelect from './AppProjectSelect'

  export default {
    name: 'app-toolbar',
    components: {AppProjectSelect},
    data () {
      return {
        miniVariant: false
      }
    },
    methods: {
      changeToolbarSize () {
        this.$bus.$emit('expandNavMenu')
        this.miniVariant = !this.miniVariant
      }
    }
  }
</script>
