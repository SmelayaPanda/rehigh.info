<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm8 md6 lg5 xl4>
        <el-card>
          <div v-if="ERROR" slot="header" class="clearfix">
            <v-icon class="error--text mr-2">error</v-icon>{{ ERROR.message }}
          </div>
          <h2 class="secondary--text">Login</h2>
          <v-container>
            <el-form :model="form" status-icon :rules="rules" auto-complete="on" ref="form">
              <el-form-item label="Email" prop="email">
                <el-input type="email" id="email" :autofocus="true" v-model="form.email" auto-complete="on"/>
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input type="password" v-model="form.password" auto-complete="off"/>
              </el-form-item>
              <el-form-item>
                <v-btn class="primary" :disabled="LOADING" @click="submitForm('form')">
                  <span v-if="!LOADING">GO</span>
                  <v-progress-circular
                    v-if="LOADING" :size="22" :width="2"
                    indeterminate color="white">
                  </v-progress-circular>
                </v-btn>
              </el-form-item>
              <div v-if="submitCount > 1">
                <span class="primary--text">Forgot the password?</span>
                <p>Fill up email in the field above and press:</p>
                <v-btn class="primary" @click="resetPassword">Reset Password</v-btn>
              </div>
              <router-link to="/signup">
                <el-button type="text">Have't account?</el-button>
              </router-link>
            </el-form>
          </v-container>
        </el-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'signin',
    data () {
      let checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Type email'))
        }
        setTimeout(() => {
          if (this.isValidEmail(value)) {
            callback()
          } else {
            callback(new Error('Email is not correct'))
          }
        }, 1000)
      }
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Type password'))
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass')
          }
          callback()
        }
      }
      return {
        form: {
          email: '',
          password: '',
          checkPass: ''
        },
        rules: {
          password: [{validator: validatePass, trigger: 'blur'}],
          email: [{validator: checkEmail, trigger: 'blur'}]
        },
        submitCount: 0
      }
    },
    methods: {
      submitForm (formName) {
        this.submitCount++
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('signUserIn', {
              email: this.form.email,
              password: this.form.password
            })
          } else {
            return this.$store.dispatch('ERR', {message: 'Please, fill up the fields correctly!'})
          }
        })
      },
      isValidEmail (email) {
        return /^\S+@\S+\.\S+$/.test(email)
      },
      resetPassword () {
        this.$store.dispatch('resetPassword', this.form.email)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
