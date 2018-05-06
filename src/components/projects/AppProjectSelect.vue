<template>
  <v-flex xs9 sm8 md5 lg3 xl3>
      <v-select
        id="project_selector"
        v-model="select"
        @change="switchProject"
        :items="items"
        :hint="select.abbr"
        label="Project"
        item-text="title"
        item-value="abbr"
        color="primary"
        :dark="true"
        single-line
        return-object
        persistent-hint>
      </v-select>
  </v-flex>
</template>
<script>
  export default {
    name: 'app-select-project',
    data () {
      return {
        select: [],
        items: [
          {title: 'Добавить проект', abbr: 'Создание нового проекта', value: 'createNewProject'},
          {divider: true},
          {title: 'Откровенные игры', abbr: 'Интернет магазин | Секс-шоп', value: 'misterio'},
          {title: 'Монтессори', abbr: 'Детский центр в бердске', value: 'montessori'}
        ]
      }
    },
    methods: {
      switchProject ({title, abbr, value}) {
        console.log(value)
        if (value === 'createNewProject') {
          // dialog with project creation
        }
      }
    }
  }
</script>

<style type="text/css">
  #project_selector {
  }
</style>
