<template>
  <div>
    <v-avatar @click="menu = !menu" app color="white" id="account_avatar">
      <span class="primary--text headline">C</span>
    </v-avatar>
    <transition name="el-fade-in-linear">
      <v-card
        v-if="menu"
        v-click-outside="hide"
        id="account_menu"
        width="380px">
        <v-card-title primary-title>
          <div>
            <v-avatar app color="secondary" size="70" id="account_menu_avatar">
              <span class="primary--text headline">C</span>
            </v-avatar>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="primary">Logout</v-btn>
          <v-btn flat color="success">Login</v-btn>
        </v-card-actions>
      </v-card>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'AppAccount',
    data () {
      return {
        menu: false
      }
    },
    methods: {
      hide () {
        this.menu = false
      }
    }
  }
</script>

<style scoped>
  #account_avatar {
    margin-right: 15px;
    transition: .3s all
  }

  #account_avatar:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  #account_menu {
    position: fixed;
    right: 20px;
    top: 70px;
  }
</style>
