<template>
  <dialog-frame open-event="openDocSignDialog">
    <div slot="title">Электронная подпись</div>
    <div slot="version">
      <v-select
        v-model="version"
        :items="items"
        label="version"
        prepend-icon="description">
      </v-select>
    </div>
    <div slot="description">
      <p>
        Данный раздел пока отсутствует. <br/>
        Рассматриваются ресурсы для возможного удаленного подписания договоров на оказание услуг
        через электронную подпись.
      </p>
    </div>
  </dialog-frame>
</template>

<script>
  import DialogFrame from '../DialogFrame'

export default {
    name: 'DocSign',
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
