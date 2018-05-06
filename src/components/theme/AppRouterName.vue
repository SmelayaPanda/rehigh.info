<template>
  <v-layout row wrap id="task_header">
    <v-flex xs12>
      <h2 id="router_header">{{ name }}</h2>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    name: 'router-name',
    props: {
      name: {type: String, required: true}
    }
  }
</script>
<style scoped lang="scss">
  #task_header {
    background: $color-primary;
  }
  #router_header {
    font-size: 22px;
    color: white;
    margin-left: 52px;
    margin-bottom: 12px;
    margin-top: 5px;
  }
</style>
