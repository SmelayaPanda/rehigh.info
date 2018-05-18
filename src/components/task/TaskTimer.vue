<template>
  <div>

  </div>
</template>

<script>
  export default {
    name: 'TaskTimer',
    data () {
      return {
        isRunning: false,
        minutes: 0,
        secondes: 0,
        time: 0,
        timer: null,
        sound: new Audio('http://s1download-universal-soundbank.com/wav/nudge.wav')
      }
    },
    methods: {
      start () {
        this.isRunning = true
        if (!this.timer) {
          this.timer = setInterval(() => {
            if (this.time > 0) {
              this.time--
            } else {
              clearInterval(this.timer)
              this.sound.play()
              this.reset()
            }
          }, 1000)
        }
      },
      stop () {
        this.isRunning = false
        clearInterval(this.timer)
        this.timer = null
      }
    },
    filters: {
      prettify (value) {
        let data = value.split(':')
        let minutes = data[0]
        let secondes = data[1]
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        if (secondes < 10) {
          secondes = '0' + secondes
        }
        return minutes + ':' + secondes
      }
    }
  }
</script>

<style scoped>

</style>
