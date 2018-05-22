<template>
  <v-layout row wrap id="task_header">
    <v-flex xs12>
      <span id="router_header">{{ name }}</span>
      <slot></slot>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    name: 'app-router-name',
    props: {
      name: {type: String, required: true}
    }
  }
</script>
<style scoped lang="scss">
  #task_header {
    background: $color-primary;
    height: 48px;
  }

  #router_header {
    font-size: 22px;
    line-height: 22px;
    color: white;
    margin-left: 52px;
    padding-right: 15px;
  }
</style>
