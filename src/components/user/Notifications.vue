<template>
  <v-container align-start>
    <v-layout row class="secondary--text">
      <v-flex xs12 sm12 md5 lg4 xl3>
        <el-card id="sounds_card">
          <p class="title">{{ msg.sound[LANG] }}</p>
          <v-divider></v-divider>
          <div id="sounds">
            <v-radio-group v-model="sound.name" @change="changeSound">
              <v-radio
                v-for="sound in sounds"
                :key="sound"
                :label="sound"
                :value="sound"
                color="primary"
              ></v-radio>
            </v-radio-group>
          </div>
        </el-card>
      </v-flex>
      <v-flex xs12 sm12 md5 lg4 xl3>
        <el-card id="sounds_settings_card">
          <span>
            {{ msg.every[LANG] }}
            {{ sound.frequency / 60000 }}
            {{ msg.min[LANG] }}
          </span>
          <v-card-text>
            <v-slider
              v-model="sound.frequency"
              :min="60000" :max="3600000" :step="60000"
              prepend-icon="timer">
            </v-slider>
          </v-card-text>
          <span>{{ msg.volume[LANG] }}</span>
          <v-card-text>
            <v-slider
              v-model="sound.volume"
              :max="1" :min="0" :step="0.01"
              prepend-icon="volume_up" thumb-label>
            </v-slider>
          </v-card-text>
          <v-btn @click="saveSound" class="success">{{ msg.save[LANG] }}</v-btn>
        </el-card>
      </v-flex>
      <v-flex xs12 sm12 md5 lg4 xl3>
        <el-card id="push_notify_card">
          <span>
            {{ msg.push[LANG] }}
          </span>
          <v-card-text>
            <div v-if="USER.fcm.token">
              <v-switch
                @change="updateFcmTopic('taskStatus', topics.taskStatus)"
                :label="msg.taskStatus[LANG]"
                v-model="topics.taskStatus"
                color="primary">
              </v-switch>
              <v-switch
                @change="updateFcmTopic('workTime', topics.workTime)"
                :label="msg.workTime[LANG]"
                v-model="topics.workTime"
                color="primary">
              </v-switch>
            </div>
            <div v-else>
              <p>Push-notifications is blocked</p>
            </div>
          </v-card-text>
        </el-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Notifications',
    data () {
      return {
        msg: {
          sound: {en: 'Notification sound', ru: 'Звук оповещений'},
          every: {en: 'Every', ru: 'Каждые'},
          min: {en: 'min', ru: 'мин'},
          volume: {en: 'Volume', ru: 'Громкость'},
          save: {en: 'Save', ru: 'Сохранить'},
          push: {en: 'Push Notifications', ru: 'Push-уведомления'},
          taskStatus: {en: 'Task Status Notify', ru: 'Смена статусов задач'},
          workTime: {en: 'Work Time Notify', ru: 'Напоминание об отдыхе'}
        },
        topics: {
          taskStatus: false,
          workTime: false
        },
        sound: {
          name: 'ding_ling',
          frequency: 5,
          volume: 0.5
        },
        audio: '',
        sounds: [
          'ding_ling', 'emergency_alert', 'facebook_message', 'ios_notification',
          'iphone_8', 'iphone_ding', 'message_bell_s8', 'miui6_notification',
          'pure_bell', 'roblox_oof', 'screaming_goat', 'sms', 'toccata_short',
          'viber_original_text', 'whippoorwill', 'yupiiii'
        ]
      }
    },
    methods: {
      playSound (name) {
        if (this.audio) {
          this.audio.pause()
          this.audio.currentTime = 0
        }
        this.audio = new Audio(require('@/assets/sounds/' + name + '.mp3'))
        this.audio.setAttribute('crossorigin', 'anonymous')
        this.audio.volume = this.sound.volume
        this.audio.play()
      },
      changeSound (name) {
        this.playSound(name)
      },
      saveSound () {
        this.$store.dispatch('saveNotificationSound', this.sound)
      },
      updateFcmTopic (topic, subscribe) {
        this.$store.dispatch('updateFcmTopic', {topic: topic, subscribe: subscribe})
      }
    },
    created () {
      this.sound = this.USER.sound
      if (this.USER.fcm && this.USER.fcm.topics) {
        this.topics.workTime = Boolean(this.USER.fcm.topics.workTime)
        this.topics.taskStatus = Boolean(this.USER.fcm.topics.taskStatus)
      }
    }
  }
</script>

<style scoped>
  #sounds_card,
  #sounds_settings_card,
  #push_notify_card {
    height: 360px;
    padding: 10px;
    max-width: 360px;
    /*margin-right: 10px;*/
  }

  #sounds {
    height: 260px;
    width: 100%;
    overflow: scroll;
  }

</style>
