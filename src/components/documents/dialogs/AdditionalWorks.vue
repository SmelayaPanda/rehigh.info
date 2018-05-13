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
          <h3>Дополнительная разработка</h3>
          <p>
            Создавать задачи на дополнительную разработку может <b>только студия</b>
            на основе переговоров с заказчиком или как предложение дальнейшего развития проекта.
            <b>Только заказчик</b> может сменить статус задачи с "создана" на "ожидает выполнения".
          </p>
          <p>
            Как только задача попадает в статус <b>"ожидает выполнения"</b>
            и Заказчик производит оплату не менее <b>50% от ее стоимости</b>, студия приступает к выполнению.
            После завершения задачи Заказчик обязан в течении двух дней принять и оплатить ее полную стоимость.
          </p>
          <p>
            Задачи на дополнительную разработку ставятся с оценочной стоимостью и Исполнитель оставляет за собой право
            изменить окончательную стоимость по завершении работ, но не более чем на 25% от первоначального значения.
            В случае неуплаты дальнейшая разработка приостанавливается.
          </p>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'AdditionalWorks',
    data () {
      return {
        dialog: false
      }
    },
    created () {
      this.$bus.$on('openAdditionalWorksDialog', () => {
        this.dialog = true
      })
    }
  }
</script>

<style scoped>
</style>
