<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Re:High Studio</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">Ok</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <h3>Технологический стек</h3>
          <p>
            В данный момент основная разработка фронт-энд части осуществляется с помощью современного
            веб-фреймворка <b>Vue.js</b> и библиотек разработанных сообществом
            ( <b>Vue-router, Vuex, Vuex-router-sync</b> ).
            Как неотемлимая часть любой веб разработки используются все преимущества новых
            <b>HTML, CSS и JavaScript (ES5-ES8) </b>
          </p>
          <p>
            В качестве <b>UI</b> компонентов создаются собственные элементы, в некоторых случаях
            могут быть задействованы библиотеки <b>ElementsUI / Vuetify</b>
          </p>
          <p>
            Единство подхода в остальных аспектах разработки обеспечивается широким набором инструментов
            предоставляемых компанией <b>Google</b>, благодаря чему наши продукты идут в ногу со временем.<br>
            <b>Firebase Firestore DB</b> - облачная масштабируемая база данных приимущественно используемая в проектах
            вместе с <b>Firebase Realtime DB</b>.
            <br>
            Для хранения медиконтента используется <b>Firebase Storage</b>,
            аутентификации пользователей осуществляется при помощи <b>Firebase Authentication</b>.
            <br>
            В качестве серверной части могут быть использованы <b>Node.js</b> или <b>Google Cloud Functions</b>.
            <br>
            В SEO мы производим подключение <b>Google Analytics</b>,
            создаем <b>микроразметку согласно schema.org</b>,
            производим составление семантического ядра сайта,
            улучшаем поисковое индексирование составлением <b>robots.txt</b> и <b>sitemap.xml</b>
          </p>
          <br>
          <p>
            Дизайн сайтов осуществялется премущественно в продуктах компании Adobe:
            <b>Adobe Photoshop, Adobe Illustrator, Adobe After Effects</b>
          </p>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'TechnologyStack',
    data () {
      return {
        dialog: false
      }
    },
    created () {
      this.$bus.$on('openTechnologyStackDialog', () => {
        this.dialog = true
      })
    }
  }
</script>

<style scoped>
</style>
