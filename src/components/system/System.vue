<template>
  <v-container>
    <el-button @click="getData" class="success white--text">
      <v-icon class="white--text">dns</v-icon>
      Снять копию базы данных
    </el-button>
    <v-tooltip bottom>
      <span>
        Внимание! Это операция полностью перетирает старые данные в базе! <br>
        Восстановление производить загрузкой файлов <b>.json</b> по одному. <br>
        <b>Имя файла должно соответствовать названию коллекции!</b>
      </span>
    <el-button @click="onPickFile" slot="activator" class="success white--text">
      <v-icon class="white--text">restore</v-icon>
        Восстановить коллекцию
    </el-button>
    </v-tooltip>
    <input
      type="file"
      style="display: none;"
      ref="fileInput"
      accept="json/*"
      @change="onFilePicked">
  </v-container>
</template>

<script>
  import * as fb from 'firebase'
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
          return fb.firestore().collection(name).get()
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
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        this.$store.dispatch('LOADING', true)
        const files = event.target.files
        let collectionName = files[0].name.split('.')[0]
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          let actions = []
          this.imageUrl = fileReader.result
          console.log(collectionName)
          let collection = JSON.parse(fileReader.result)
          for (let docId in collection) {
            actions.push(fb.firestore().collection(collectionName).doc(docId).set(collection[docId]))
          }
          Promise.all(actions).then(() => {
            console.log('collection: ' + collectionName + ' uploaded')
            this.$refs.fileInput.value = ''
            this.$store.dispatch('LOADING', false)
          })
            .catch(err => {
              console.log(err)
              this.$store.dispatch('LOADING', false)
            })
          console.log(actions)
        })
        fileReader.readAsText(files[0])
        this.image = files[0]
      }
    }
  }
</script>

<style scoped>
</style>
