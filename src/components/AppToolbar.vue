<template>
  <v-toolbar
    :clipped-left="false"
    height="70"
    app flat
    class="primary white--text">
    <div id="mini_variant_btn">
      <v-btn icon @click.stop="changeToolbarSize">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" class="white--text"></v-icon>
      </v-btn>
    </div>
    <app-project-select/>
    <v-spacer></v-spacer>
    <div id="notification_btn">
      <v-btn icon @click.stop="$bus.$emit('openNotifications')">
        <v-icon class="white--text">notifications_none</v-icon>
      </v-btn>
    </div>
    <app-account/>
    <br>
  </v-toolbar>
</template>
<script>
  import AppProjectSelect from './projects/AppProjectSelect'
  import AppAccount from './user/AppAccount'

  export default {
    name: 'app-toolbar',
    components: {AppAccount, AppProjectSelect},
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

<style scoped type="text/css">
  #mini_variant_btn {
    width: 40px;
    margin-left: 0px;
  }

  #notification_btn {
    width: 40px;
    margin-right: 15px;
    margin-top: 3px;
  }
</style>
