<template>
  <div>
    <app-router-name :name="msg.contacts[LANG]"/>
    <v-container class="secondary--text">
      <v-layout row class="secondary--text">
        <v-flex xs12 sm11 md10 lg7 xl7>
          <h1>Re:High Studio</h1>
          <h3><v-icon class="secondary--text mb-1" small>share</v-icon>
            Site <a href="https://rehigh.pro/" target="_blank" id="rehigh_site">rehigh.pro</a>
          </h3>
          <h3><v-icon class="secondary--text mb-1" small>email</v-icon> reHighStudio@gmail.com</h3>
          <b><v-icon class="secondary--text mb-1" small>location_on</v-icon> г. Новосибирск, ул Сиреневая 31, кв 65</b>
          <v-layout row class="secondary--text mt-3">
            <v-flex xs12 sm6 md6 lg6 xl6
            v-for="people in team" :key="people.email">
              <v-card>
                <v-card-title>
                  <div class="avatar_wrap">
                    <img :src="people.avatar" class="people_avatar" alt="">
                  </div>
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
  .avatar_wrap {
    width: 72px;
    height: 72px;
    margin-left: 10px;
    margin-right: 20px;
  }
  .people_avatar {
    margin-right: 25px;
    object-fit: cover;
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }

  #rehigh_site:hover {
    text-decoration: underline;
  }
</style>
