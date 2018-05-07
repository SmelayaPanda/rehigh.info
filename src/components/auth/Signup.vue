<template>
  <v-container>
    <!--Authentication form-->
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="14" :md="12" :lg="10" :xl="8">
        <el-card>
          <div v-if="this.appError" slot="header" class="clearfix">
            <v-icon class="error--text mr-2">error</v-icon>{{ this.appError.message }}
          </div>
          <h2>Register</h2>
          <v-container>
            <el-form :model="formRule" status-icon :rules="rules" auto-complete="on" ref="formRule">
              <el-form-item label="Email" prop="email">
                <el-input type="email" :autofocus="true" v-model="formRule.email" auto-complete="on"/>
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input type="password" v-model="formRule.password" auto-complete="off"/>
              </el-form-item>
              <el-form-item label="Password check" prop="checkPass">
                <el-input type="password" v-model="formRule.checkPass" auto-complete="off"/>
              </el-form-item>
              <el-form-item>
                <v-btn class="primary" :disabled="this.isLoading" @click="submitForm('formRule')">
                  go
                </v-btn>
              </el-form-item>
            </el-form>
            <router-link to="/signin">
              <el-button type="text">Have account?</el-button>
            </router-link>
          </v-container>
        </el-card>
      </el-col>
    </el-row>
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
        } else if (value.length < 6) {
          callback(new Error('Password length > 6 symbols'))
        } else {
          if (this.formRule.checkPass !== '') {
            this.$refs.formRule.validateField('checkPass')
          }
          callback()
        }
      }
      let validateConfPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Repeat password'))
        } else if (value !== this.formRule.password) {
          callback(new Error('Passwords do not match!'))
        } else {
          callback()
        }
      }
      return {
        formRule: {
          password: '',
          checkPass: '',
          email: ''
        },
        rules: {
          password: [{validator: validatePass, trigger: 'blur'}],
          checkPass: [{validator: validateConfPass, trigger: 'blur'}],
          email: [{validator: checkEmail, trigger: 'blur'}]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('signUserUp', {email: this.formRule.email, password: this.formRule.password})
          } else {
            return this.$store.dispatch('ERR', {message: 'Please, fill up the fields correctly!'})
          }
        })
      },
      isValidEmail: function (email) {
        return /^\S+@\S+\.\S+$/.test(email)
      }
    }
  }
</script>

<style scoped>
</style>
