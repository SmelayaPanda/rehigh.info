<template>
  <div>
    <v-avatar
      @click="menu = !menu"
      id="account_avatar"
      app color="white">
      <span class="primary--text headline">{{ USER ? USER.email[0].toUpperCase() : 'A' }}</span>
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
                <span class="primary--text display-1">{{ USER ? USER.email[0].toUpperCase() : 'A' }}</span>
              </v-avatar>
            </v-flex>
            <v-flex xs8 v-if="USER">
              <span>{{ USER.firstname.toUpperCase() }} {{ USER.lastname.toUpperCase() }}</span> <br>
              <span class="info--text">{{ USER.email }}</span> <br>
              <v-btn @click="viewMyAccount" small class="primary" id="my_account_btn">{{ msg.account[LANG] }}</v-btn>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-container fluid v-if="USER">
          <v-layout row wrap>
            <v-flex xs12 sm6 md6>
              <h3 class="info--text" id="account_role_title">{{ msg.role[LANG] }}</h3>
              <v-radio-group @change="changeUserRole" v-model="role" column id="account_role">
                <v-radio
                  v-for="role in USER.roles" :key="role" color="primary"
                  :label="ROLES[role][LANG]" :value="role">
                </v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <h3 class="info--text" id="user_lang_title">{{ msg.lang[LANG] }}</h3>
              <v-radio-group @change="changeUserLang" v-model="lang" column id="user_lang">
                <v-radio color="primary" label="RU" value="ru"></v-radio>
                <v-radio color="primary" label="EN" value="en"></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn v-if="USER" @click="logout" flat color="primary">{{ msg.logout[LANG] }}</v-btn>
          <div v-if="!USER">
            <v-btn @click="login" flat color="success">{{ msg.login[LANG] }}</v-btn>
            <v-btn @click="register" flat color="success">{{ msg.register[LANG] }}</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'AccountMenu',
    data () {
      return {
        menu: false,
        role: 'guest',
        lang: 'ru',
        msg: {
          lang: {ru: 'Язык', en: 'Language'},
          role: {ru: 'Аккаунт-роль', en: 'Account-role'},
          account: {ru: 'Мой аккаунт', en: 'My account'},
          logout: {ru: 'Выйти', en: 'Logout'},
          login: {ru: 'Войти', en: 'Login'},
          register: {ru: 'Регистрация', en: 'Register'}
        }
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
      },
      changeUserRole (val) {
        this.$store.dispatch('setRole', val)
      },
      changeUserLang (val) {
        this.$store.dispatch('setLang', val)
      },
      viewMyAccount () {
        this.menu = false
        this.$router.push('/account')
      }
    },
    watch: {
      LANG (val) {
        this.lang = val
      }
    },
    created () {
      this.role = this.ROLE
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

  #user_lang,
  #account_role {
    padding-top: 0;
  }
</style>
