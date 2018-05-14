<!-- TEMPLATE FOR DOCS -->
<!--<dialog-frame open-event="openEventName">-->
  <!--<div slot="title"></div>-->
  <!--<div slot="version">-->
    <!--<v-select v-model="version" :items="items" label="version" prepend-icon="description"></v-select>-->
  <!--</div>-->
  <!--<div slot="description"></div>-->
<!--</dialog-frame>-->
<template>
  <v-layout row justify-center :key="openEvent">
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
          <v-layout row justify-center>
            <v-flex xs10>
              <h2>
                <slot name="title"></slot>
              </h2>
              <div id="version_wrap">
                <slot name="version"></slot>
              </div>
              <slot name="description"></slot>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'DialogFrame',
    props: {
      openEvent: {type: String, required: true}
    },
    data () {
      return {
        dialog: false
      }
    },
    created () {
      this.$bus.$on(this.openEvent, () => {
        this.dialog = true
      })
    }
  }
</script>

<style scoped>
  #version_wrap {
    width: 110px;
  }
</style>
