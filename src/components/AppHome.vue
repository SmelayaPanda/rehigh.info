<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-container class="secondary--text">
          <h2 class="info--text">Добро пожаловать!</h2>
          <p>Данная система предназначена для легкого и прозрачного взаимодействия между студией и ее заказчиками.</p>
          <h3 class="info--text">Чтобы приступить к работе необходимо выбрать:</h3>
          <ol class="ml-3">
            <li>Роль (в вашем аккаунте - правый верхний угол)</li>
            <li>Ваш проект (меню сверху)</li>
          </ol>
          <br>
          <ul>
            <li>Основные разделы для работы находятся в навигационном меню слева
              (<v-icon>chevron_left</v-icon>- свернуть меню )</li>
            <li>Каждый раздел имеет свою документацию (помощь) - <v-icon>help</v-icon></li>
            <li>Все изменения связанные с вашим проектом будут отображаться в разделе оповещения -
              <v-icon>notifications_none</v-icon></li>
          </ul>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'AppHome'
  }
</script>

<style scoped>

</style>
