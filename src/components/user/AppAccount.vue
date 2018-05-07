<template>
  <div>
    <v-avatar
      @click="menu = !menu"
      id="account_avatar"
      app color="white">
      <span class="primary--text headline">{{ appUser ? appUser.email[0].toUpperCase() : 'A' }}</span>
    </v-avatar>
    <transition name="el-fade-in-linear">
      <v-card
        v-if="menu"
        v-click-outside="hide"
        id="account_menu"
        width="380px">
        <v-card-title primary-title>
          <v-layout row>
            <v-flex xs4>
              <v-avatar
                id="account_menu_avatar"
                app color="secondary"
                size="80"
                class="elevation-3">
                <span class="primary--text display-1">{{ appUser ? appUser.email[0].toUpperCase() : 'A' }}</span>
              </v-avatar>
            </v-flex>
            <v-flex xs8 v-if="appUser">
              <span>Re:High Studio</span> <br>
              <span class="info--text">{{ appUser.email }}</span> <br>
              <v-btn small class="primary" id="my_account_btn">My account</v-btn>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn v-if="appUser" @click="logout" flat color="primary">Logout</v-btn>
          <div v-if="!appUser">
            <v-btn @click="login" flat color="success">Login</v-btn>
            <v-btn @click="register" flat color="success">Register</v-btn>
          </div>
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
      },
      logout () {
        this.menu = false
        this.$store.dispatch('logout')
      },
      login () {
        this.menu = false
        this.$router.push('/signin')
      },
      register () {
        this.menu = false
        this.$router.push('/signup')
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

  #my_account_btn {
    margin-left: 0;
  }
</style>
