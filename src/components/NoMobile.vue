<template>
    <v-container text-xs-center id="mobile">
      <h2 class="logo-green--text">re:HIGH Studio Work Panel</h2>
      <h4 class="white--text">Mobile version of the platform is missing</h4>
      <h4 class="white--text">Мобильная версия платформы отсутствует</h4>
      <img src="@/assets/logo.svg" id="logo" alt="">
    </v-container>
</template>

<script>
  export default {
    name: 'NoMobile'
  }
</script>

<style scoped lang="scss">
  #logo {
    margin-top: 20px;
    width: 200px;
  }

  #mobile {
    height: 100vh;
    background: $color-secondary;
  }
</style>
