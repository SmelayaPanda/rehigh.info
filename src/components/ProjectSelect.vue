<template>
  <v-flex xs22 sm18 md5 lg3 xl3>
    <v-select
      :items="items"
      v-model="select"
      :hint="select.abbr"
      label="Выберите проект"
      single-line
      item-text="state"
      item-value="abbr"
      return-object
      color="primary"
      :dark="true"
      persistent-hint>
    </v-select>
  </v-flex>
</template>
<script>
  export default {
    name: 'select-project',
    data () {
      return {
        select: {state: '', abbr: ''},
        items: [
          {state: 'Откровенные игры', abbr: 'Интернет магазин | Секс-шоп'},
          {state: 'Монтессори', abbr: 'Детский центр в бердске'}
        ]
      }
    }
  }
</script>
