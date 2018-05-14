<template>
  <dialog-frame open-event="openAdditionalWorksDialog">
    <div slot="title">
      Дополнительная разработка
    </div>
    <div slot="version">
      <v-select
        v-model="version"
        :items="items"
        label="version"
        prepend-icon="description">
      </v-select>
    </div>
    <div slot="description">
      <ol>
        <li>
          Создавать задачи на дополнительную разработку может <b>только студия</b>
          на основе переговоров с заказчиком или как предложение дальнейшего развития проекта. <br>
        </li>
        <li>
          <b>Только заказчик</b> может изменить статус задачи с "создана" на "ожидает" (выполнения).
        </li>
        <li>
          Как только задача попадает в статус <b>"ожидает"</b>
          и Заказчик производит оплату не менее <b>50% от ее стоимости</b>, студия приступает к выполнению.
        </li>
        <li>
          После завершения задачи Заказчик обязан в течении двух дней принять и оплатить ее полную стоимость.
        </li>
        <li>
          Задачи на дополнительную разработку ставятся с оценочной стоимостью и Исполнитель оставляет за собой
          право
          изменить окончательную стоимость по завершении работ, но не более чем на 25% от первоначального
          значения.
          В случае неуплаты дальнейшая разработка приостанавливается.
        </li>
      </ol>
    </div>
  </dialog-frame>
</template>

<script>
  import DialogFrame from '../DialogFrame'

export default {
    name: 'AdditionalWorks',
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
