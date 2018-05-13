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
          <h3>Важно знать</h3>
          <p>
            В разделе <b>стек-технологий</b> вы можете посмотреть то, что мы используем для разработки проектов.
            Хотя в нашем арсенале только современное оружие, история знает примеры политических и иных мотивов
            блокировки, урезания и фундаментального изменения ресурсов любого уровня.
            Обращаем Ваше внимание - согласно договору студия не несет ответственности за изменения
            такого рода и не производит бесплатную доработку или переделывание своих продуктов в таких ситуациях.
          </p>
          <p>
            <b>Будьте готовы к дополнительным расходам после создания сайта.</b>
            Как правило, все сайты требуют дополнительные финансовые вложения на поддержку:
            как на содержание серверов, баз данных или иных платных сервисов подключенных к проекту,
            так и на дополнительную доработку со стороны разработчика
            (внесение корректировок в функционал, устранение ошибок).
            Это нормальная практика во всем мировом ИТ сообществе, принимайте это как должное.
          </p>
          <p><b>Медиа-контент.</b>
            Для того чтобы не произошло непредвиденных блокировок функционирующего сайта,
            обращаем Ваше внимание на важность подбора лицензионного медиаконтента
            (в случае если он осуществляется с Вашей стороны).</p>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'ImportantToKnow',
    data () {
      return {
        dialog: false
      }
    },
    created () {
      this.$bus.$on('openImportantToKnowDialog', () => {
        this.dialog = true
      })
    }
  }
</script>

<style scoped>
</style>
