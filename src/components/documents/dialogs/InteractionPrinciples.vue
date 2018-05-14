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
          <h3>Принципы взаимодействия</h3>
          <p>
            Наша студия работает в <b>"свободном режиме"</b> и не дает гарантий Заказчику
            на доступность в какое-то определенное время суток. <br>
            Как правило мы связываемся с Заказчиком по просьбе моментально,
            но не исключаем возможность задержки до суток.
          </p>
          <p>
            Студия <b>не производит переговоры по рабочим вопросам в социальных сетях</b>
            (VK, Facebook, Однокласники, и т.д.) в виду большого кол-ва отвлекающих факторов данных платформ. <br>
            На данный момент мы использует <b>Google Hangouts</b> для переговоров с Заказчиком.
          </p>
          <p>
            Предложения по использование нелицензионного медиаконтента на наших сайтах не допускается.
          </p>
          <p>
            Студия имеет право не предоставлять полный или частичный доступ к админ панели сайта, его функционалу,
            интерфейсу до полного завершения работ. Контроль за выполнением ТЗ может осуществлять иными средствами:
            видеозвонок, скриншоты или индивидуальный показ при встрече.
          </p>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'InteractionPrinciples',
    data () {
      return {
        dialog: false
      }
    },
    created () {
      this.$bus.$on('openInteractionPrinciplesDialog', () => {
        this.dialog = true
      })
    }
  }
</script>

<style scoped>
</style>
