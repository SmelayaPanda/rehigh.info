<template>
  <v-container>
    <el-button @click="getData" class="success white--text">
      <v-icon class="white--text">dns</v-icon>
      Снять копию базы данных
    </el-button>
  </v-container>
</template>

<script>
  import * as firebase from 'firebase'
  import JSZip from 'jszip'
  import FileSaver from 'file-saver'

  export default {
    name: 'System',
    data () {
      return {
        collections: [
          'projects',
          'tasks',
          'users',
          'workHistory'
        ]
      }
    },
    methods: {
      getData () {
        let zip = new JSZip()
        this.$store.dispatch('LOADING', true)

        let getCollectionData = function (name) {
          return firebase.firestore().collection(name).get()
            .then(snap => {
              let data = {}
              snap.docs.forEach(el => {
                data[el.id] = el.data()
              })
              zip.file(name + '.json', JSON.stringify(data))
            })
        }
        let actions = []
        this.collections.forEach(name => actions.push(getCollectionData(name)))

        Promise.all(actions)
          .then(() => {
            zip.generateAsync({type: 'blob'})
              .then((content) => {
                FileSaver.saveAs(content, 'rehigh_info_dump_' + new Date().toLocaleString() + '.zip')
                this.$store.dispatch('LOADING', false)
              })
              .catch(err => {
                console.log(err)
                this.$store.dispatch('LOADING', false)
              })
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>

</style>
