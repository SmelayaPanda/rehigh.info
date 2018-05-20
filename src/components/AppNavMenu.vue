<template>
  <v-navigation-drawer
    persistent
    :mini-variant="miniVariant"
    :clipped="false"
    v-model="isOpened"
    class="secondary elevation-7"
    width="280"
    hide-overlay
    stateless
    fixed
    app>
    <v-progress-linear
      v-if="LOADING"
      :indeterminate="LOADING"
      height="3"
      color="primary"
      id="app_loading">
    </v-progress-linear>
    <v-list id="rehigh_title">
      <v-list-tile>
        <v-list-tile-action>
          <v-icon class="primary--text">gesture</v-icon>
        </v-list-tile-action>
        <v-list-tile-title class="title">
          <router-link to="/" exact>
            Re:High Studio
          </router-link>
        </v-list-tile-title>
      </v-list-tile>
      <p v-if="!miniVariant" id="work_panel">work panel</p>
      <v-divider></v-divider>
      <v-list-tile v-for="i in items" :key="i.router" @click="$router.push(i.router)">
        <v-list-tile-action>
          <v-icon class="primary--text mb-1">{{ i.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="body-2">{{ i.title[LANG] }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <!-- TIME MANAGER -->
      <div v-if="ROLE === ROLES.admin.val">
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon class="primary--text mb-1">timer</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="body-2">{{ msg.timer[LANG] }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-container>
          <div v-if="TIMER.task">
            <v-btn v-if="!TIMER.to" flat @click="stopTimer" block>
              <span class="white--text">
                <v-icon id="pause_timer_icon">pause</v-icon>
                <span class="white--text">{{ timeInWork | msTo('HMS')  }}</span>
              </span>
            </v-btn>
            <v-btn v-else flat @click="startTimer" block>
              <span class="white--text">
                <v-icon id="start_timer_icon">play_arrow</v-icon>
                Start
              </span>
            </v-btn>
            <el-tag type="success" size="small">id: {{ TIMER.task.id }}</el-tag>
            <el-tag size="small">{{ TASK_STATUSES[TIMER.task.status][LANG] }}</el-tag>
            <p class="mt-2">
              <span v-if="PROJECTS[TIMER.task.projectId]">{{ PROJECTS[TIMER.task.projectId].title }}</span>
              <v-icon class="white--text" small>keyboard_arrow_right</v-icon>
              {{ TIMER.task.title }}
            </p>
          </div>
        </v-container>
      </div>
    </v-list>
    <v-card flat id="bottom_nav">
      <v-bottom-nav :value="true" :active.sync="bottomNav" absolute color="transparent">
        <v-btn @click="$bus.$emit('openHelp')" flat color="primary" value="help">
          <span class="white--text">{{ msg.help[LANG] }}</span>
          <v-icon>help</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>
  </v-navigation-drawer>
</template>
<script>
  export default {
    name: 'app-nav-menu',
    data () {
      return {
        isOpened: true,
        miniVariant: false,
        timeInWork: 0,
        ticTacId: '',
        items: [
          {title: {en: 'PROJECT', ru: 'ПРОЕКТ'}, router: '/project', icon: 'settings_ethernet'},
          {title: {en: 'TASK', ru: 'ЗАДАЧИ'}, router: '/task', icon: 'whatshot'},
          {title: {en: 'DOCUMENTS', ru: 'ДОКУМЕНТЫ'}, router: '/documents', icon: 'insert_drive_file'},
          {title: {en: 'CONTACTS', ru: 'КОНТАКТЫ'}, router: '/contacts', icon: 'perm_contact_calendar'}
        ],
        bottomNav: '',
        msg: {
          help: {en: 'Help', ru: 'Помощь'},
          timer: {en: 'Time-manager', ru: 'Тайм-менеджер'}
        }
      }
    },
    methods: {
      async startTimer () {
        if (this.TIMER.task.id) {
          await this.$store.dispatch('setTimer', {isTimerStart: true})
          this.startTicTac()
        } else {
          this.timeInWork = 0
        }
      },
      stopTimer () {
        this.$store.dispatch('setTimer', {isTimerStop: true})
        clearInterval(this.ticTacId)
      },
      startTicTac () {
        this.ticTacId = setInterval(() => {
          this.timeInWork = new Date().getTime() - new Date(this.TIMER.from)
        }, 1000)
      }
    },
    created () {
      this.$bus.$on('expandNavMenu', () => {
        this.miniVariant = !this.miniVariant
      })
      this.$bus.$on('startTicTac', () => {
        this.startTicTac()
      })
      this.$bus.$on('stopTicTac', () => {
        clearInterval(this.ticTacId)
      })
      if (this.TIMER.from && !this.TIMER.to) {
        this.startTicTac()
      }
    }
  }
</script>
<style scoped lang="scss">
  #work_panel {
    text-align: center;
    font-style: italic;
    margin-top: -6px;
    margin-bottom: 30px;
    font-size: 13px;
  }

  #rehigh_title {
    margin-top: 30px;
    color: white;
  }

  #app_loading {
    margin: 0;
    padding: 0;
    position: absolute;
  }

  #bottom_nav {
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  #start_timer_icon {
    margin-left: -40px;
    margin-bottom: 2px;
    color: $color-success;
  }

  #pause_timer_icon {
    margin-left: -30px;
    margin-bottom: 2px;
    color: $color-error;
  }

  #task_project_name {
    font-size: 12px;
    font-weight: bold;
  }
</style>
