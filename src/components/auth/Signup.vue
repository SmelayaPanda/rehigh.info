<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm8 md6 lg5 xl4>
        <el-card>
          <div v-if="this.appError" slot="header" class="clearfix">
            <v-icon class="error--text mr-2">error</v-icon>{{ this.appError.message }}
          </div>
          <h2>Register</h2>
          <v-container>
            <el-form :model="form" status-icon :rules="rules" auto-complete="on" ref="form">
              <el-form-item label="Firstname" prop="firstname">
                <el-input type="text" id="firstname" :autofocus="true" v-model="form.firstname" auto-complete="on"/>
              </el-form-item>
              <el-form-item label="Lastname" prop="lastname">
                <el-input type="text" id="lastname" :autofocus="true" v-model="form.lastname" auto-complete="on"/>
              </el-form-item>
              <el-form-item label="Nickname" prop="nickname">
                <el-input type="text" id="nickname" :autofocus="true" v-model="form.nickname" auto-complete="on"/>
              </el-form-item>
              <el-form-item label="Email" prop="email">
                <el-input type="email" :autofocus="true" v-model="form.email" auto-complete="on"/>
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input type="password" v-model="form.password" auto-complete="off"/>
              </el-form-item>
              <el-form-item label="Password check" prop="checkPass">
                <el-input type="password" v-model="form.checkPass" auto-complete="off"/>
              </el-form-item>
              <el-form-item>
                <v-btn class="primary" :disabled="isLoading || !isValidForm" @click="submitForm('form')">
                  go
                </v-btn>
              </el-form-item>
            </el-form>
            <router-link to="/signin">
              <el-button type="text">Have account?</el-button>
            </router-link>
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
      let notEmptyString = (rule, value, callback) => {
        if (!value) {
          callback(new Error('Fill in the field'))
        } else {
          callback()
        }
      }
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
        } else if (value.length < 6) {
          callback(new Error('Password length > 6 symbols'))
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass')
          }
          callback()
        }
      }
      let validateConfPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Repeat password'))
        } else if (value !== this.form.password) {
          callback(new Error('Passwords do not match!'))
        } else {
          callback()
        }
      }
      return {
        form: {
          firstname: '',
          lastname: '',
          nickname: '',
          email: '',
          password: '',
          checkPass: ''
        },
        rules: {
          firstname: [{validator: notEmptyString, trigger: 'blur'}],
          lastname: [{validator: notEmptyString, trigger: 'blur'}],
          nickname: [{validator: notEmptyString, trigger: 'blur'}],
          email: [{validator: checkEmail, trigger: 'blur'}],
          password: [{validator: validatePass, trigger: 'blur'}],
          checkPass: [{validator: validateConfPass, trigger: 'blur'}]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('signUserUp', {
              firstname: this.form.firstname,
              lastname: this.form.lastname,
              nickname: this.form.nickname,
              email: this.form.email,
              password: this.form.password
            })
          } else {
            return this.$store.dispatch('ERR', {message: 'Please, fill up the fields correctly!'})
          }
        })
      },
      isValidEmail: function (email) {
        return /^\S+@\S+\.\S+$/.test(email)
      }
    },
    computed: {
      isValidForm () {
        return this.form.firstname && this.form.lastname && this.form.nickname &&
          this.form.password.length > 5 && this.form.password === this.form.checkPass &&
          this.isValidEmail(this.form.email)
      }
    }
  }
</script>

<style scoped>
</style>
