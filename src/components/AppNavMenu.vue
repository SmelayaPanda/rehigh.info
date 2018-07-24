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
      <v-list-tile
        v-for="i in items" :key="i.router"
        v-if="i.roles.indexOf(ROLE) !== -1"
        @click="$router.push(i.router)">
        <v-list-tile-action>
          <v-icon class="primary--text mb-1">{{ i.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="body-2">{{ i.title[LANG] }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <!-- TIME MANAGER -->
      <div v-if="ROLE === ROLES.admin.val && TIMER.task">
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon class="primary--text mb-1">timer</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="body-2">{{ msg.timer[LANG] }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- TIMER MINI -->
        <v-list v-if="miniVariant">
          <v-list-tile v-if="!TIMER.to" @click="stopTimer">
            <v-list-tile-action>
              <v-icon class="error--text">pause</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-else @click="startTimer">
            <v-list-tile-action>
              <v-icon class="success--text">play_arrow</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <!-- TIMER -->
        <v-container v-else>
          <v-btn v-if="!TIMER.to" flat @click="stopTimer" block>
            <span class="white--text">
              <v-icon id="pause_timer_icon">pause</v-icon>
              <span class="white--text">{{ timeInWork | msTo('HMS') }}</span>
            </span>
          </v-btn>
          <v-btn v-else flat @click="startTimer" block>
            <span class="white--text">
              <v-icon id="start_timer_icon">play_arrow</v-icon>
              {{ msg.start[LANG] }}
            </span>
          </v-btn>
          <el-tag type="success" size="small">id: {{ TIMER.task.id }}</el-tag>
          <el-tag v-if="TASK_STATUSES[TIMER.task.status]" size="small">
            {{ TASK_STATUSES[TIMER.task.status][LANG] }}
          </el-tag>
          <p class="mt-2">
            <span v-if="PROJECTS[TIMER.task.projectId]">{{ PROJECTS[TIMER.task.projectId].title }}</span>
            <v-icon class="white--text" small>keyboard_arrow_right</v-icon>
            {{ TIMER.task.title }}
          </p>
          <p>Затрачено: {{ TIMER.task.time.real | msTo('HMS') }}</p>
          <v-text-field
            dark
            label="Ручное время"
            v-model="addMinutes"
            suffix="мин"
            type="number">
          </v-text-field>
          <v-btn dark small color="primary" @click="addHandleMinutes"
                 :disabled="!addMinutes || !TIMER.to"
                 style="margin-top: -10px; margin-left: 0px;">
            <v-icon dark>add</v-icon>
          </v-btn>
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
  import msTo from './../filters/msTo'
  import * as SWT from 'worker-timers'

  export default {
    name: 'app-nav-menu',
    data () {
      return {
        isOpened: true,
        miniVariant: false,
        timeInWork: 0,
        ticTacId: '',
        soundNotifyId: '',
        addMinutes: '',
        items: [
          {
            title: {en: 'PROJECT', ru: 'ПРОЕКТ'},
            router: '/project',
            icon: 'settings_ethernet',
            roles: ['admin', 'client']
          },
          {
            title: {en: 'TASK', ru: 'ЗАДАЧИ'},
            router: '/task',
            icon: 'whatshot',
            roles: ['admin', 'client']
          },
          {
            title: {en: 'DOCUMENTS', ru: 'ДОКУМЕНТЫ'},
            router: '/documents',
            icon: 'insert_drive_file',
            roles: ['admin', 'client']
          },
          {
            title: {en: 'CONTACTS', ru: 'КОНТАКТЫ'},
            router: '/contacts',
            icon: 'perm_contact_calendar',
            roles: ['admin', 'client', 'guest']
          },
          {
            title: {en: 'SYSTEM', ru: 'СИСТЕМА'},
            router: '/system',
            icon: 'settings',
            roles: ['developer']
          }
        ],
        bottomNav: '',
        msg: {
          help: {en: 'Help', ru: 'Помощь'},
          start: {en: 'Start', ru: 'Старт'},
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
        document.title = 're:HIGH Studio Work Panel'
        clearInterval(this.ticTacId)
        clearInterval(this.soundNotifyId)
      },
      startTicTac () {
        this.ticTacId = SWT.setInterval(() => {
          this.timeInWork = new Date().getTime() - new Date(this.TIMER.from)
          let time = msTo(this.timeInWork, 'TAB', this.LANG)
          document.title = time
        }, 1000)
        this.setNotifications()
      },
      setNotifications () {
        this.soundNotifyId = SWT.setInterval(() => {
          if (this.USER.fcm && this.USER.fcm.topics && this.USER.fcm.topics.workTime) {
            this.$store.dispatch('sendFcm', {
              title: `Время работы: ${msTo(this.timeInWork, 'TAB', this.LANG)}`,
              body: `Не забывайте о перерывах, берегите здоровье!`
            })
          }
          this.audio = new Audio(require('@/assets/sounds/' + this.USER.sound.name + '.mp3'))
          this.audio.setAttribute('crossorigin', 'anonymous')
          this.audio.volume = this.USER.sound.volume
          this.audio.play()
        }, this.USER.sound.frequency + 1)
      },
      addHandleMinutes () {
        this.$store.dispatch('addHandleMinutes', this.addMinutes)
          .then(() => {
            this.addMinutes = ''
          })
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
        document.title = 're:HIGH Studio Work Panel'
        SWT.clearInterval(this.ticTacId)
        SWT.clearInterval(this.soundNotifyId)
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
    margin-top: 18px;
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

  #handle_time {
    color: white;
  }
</style>
