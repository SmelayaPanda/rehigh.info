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
          <h3>Электронная подпись</h3>
          <p>
            Данный раздел пока отсутствует. <br/>
            Рассматриваются ресурсы для возможного удаленного подписания договоров на оказание услуг
            через электронную подпись.
          </p>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'DocSign',
    data () {
      return {
        dialog: false
      }
    },
    created () {
      this.$bus.$on('openDocSignDialog', () => {
        this.dialog = true
      })
    }
  }
</script>

<style scoped>
</style>
