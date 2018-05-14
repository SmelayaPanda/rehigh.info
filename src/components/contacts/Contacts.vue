<template>
  <div>
    <app-router-name :name="msg.contacts[LANG]"/>
    <v-container class="secondary--text">
      <v-layout row class="secondary--text">
        <v-flex xs12 sm11 md10 lg7 xl7>
          <h1>Re:High Studio</h1>
          <h3><v-icon class="secondary--text mb-1">email</v-icon> reHighStudio@gmail.com</h3>
          <h3><v-icon class="secondary--text mb-1">last_page</v-icon>
            <a href="https://rehigh.pro/" target="_blank">https://rehigh.pro/</a>
          </h3>
          <b><v-icon class="secondary--text mb-1">location_on</v-icon> г. Новосибирск, ул Сиреневая 31, кв 65</b>
          <v-layout row class="secondary--text mt-2">
            <v-flex xs12 sm6 md6 lg6 xl6
            v-for="people in team" :key="people.email">
              <v-card>
                <v-card-title>
                  <v-avatar class="ml-3" size="72">
                    <img :src="people.avatar" class="people_avatar" alt="">
                  </v-avatar>
                  <h3>{{ people.name }}</h3>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <p>{{  people.email }}</p>
                  <p>{{  people.phone }}</p>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import AppRouterName from '../theme/AppRouterName'

  export default {
    name: 'contacts',
    components: {AppRouterName},
    data () {
      return {
        team: [
          {
            name: 'Алексей Азаров',
            avatar: './static/team/panda.jpg',
            phone: '8 (999) 467 78 57',
            email: 'SmelayaPandaGM@gmail.com'
          }, {
            name: 'Виктория Зайцева',
            avatar: './static/team/olivia.jpg',
            phone: '8 (923) 128 69 28',
            email: 'vika.erika@gmail.com'
          }
        ],
        msg: {
          contacts: {en: 'Contacts', ru: 'Контакты'}
        }
      }
    }
  }
</script>

<style scoped>
  .people_avatar {
    margin-right: 25px;
    object-fit: cover;
  }
</style>
