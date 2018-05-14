<template>
  <dialog-frame open-event="openTechnologyStackDialog">
    <div slot="title">Технологический стек</div>
    <div slot="version">
      <v-select v-model="version" :items="items" label="version" prepend-icon="description"></v-select>
    </div>
    <div slot="description">
      <ol>
        <li>
          HTML, CSS и JavaScript (ES5-ES8)
        </li>
        <li>
          <b>Vue.js</b> - основа фронтэнд (+<b>Vue-router, Vuex, Vuex-router-sync</b>). <br>
        </li>
        <li>
          В качестве <b>UI</b> компонентов создаются собственные элементы, в некоторых случаях
          могут быть задействованы библиотеки <b>ElementsUI / Vuetify / Material Design</b>
        </li>
        <li>
          Среда разработки - <b>WebStorm IDE</b> JetBrains.
        </li>
        <li>
          Репозиторием для хранения кода выступает <b>GitHub</b>.
        </li>
        <li>
          Доменные имена приобретаются на сервисе <b>GoDaddy</b>
          (администрируюся могут с помощью сервиса <b>Cloud Flare</b>)
        </li>
        <li>
          В качестве баз данных используются: <br>
          <b>Firestore DB</b> - облачная масштабируемая база от Google, <br>
          <b>Firebase Realtime DB</b> - реалтайм база данных от Google <br>
          Так же могут быть задействованы SQL базы данных (MySQL, Oracle, Postgress)
        </li>
        <li>
          Для хранения медиконтента используется <b>Firebase Storage</b>.<br>
        </li>
        <li>
          В качестве серверной части могут быть использованы <b>Node.js</b> или <b>Google Cloud Functions</b>.
        </li>
        <li>
          Аутентификации пользователей осуществляется при помощи <b>Firebase Authentication</b>.
        </li>
        <li>
          Дизайн сайтов премущественно разрабатывается в программах:
          <b>Adobe Photoshop, Adobe Illustrator, Adobe After Effects.</b>
        </li>
      </ol>
    </div>
  </dialog-frame>
</template>

<script>
  import DialogFrame from '../DialogFrame'

  export default {
    name: 'TechnologyStack',
    components: {DialogFrame},
    data () {
      return {
        version: '1.0',
        items: ['1.0']
      }
    }
  }
</script>

<style scoped>
</style>
