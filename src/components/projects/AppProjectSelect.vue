<template>
  <el-row row wrap>
    <el-col :span="19">
      <v-select
        id="project_selector"
        v-model="select"
        @change="switchProject"
        :disabled="!appUser || !appProjects || appRole === ROLES.guest.val"
        :items="items"
        :hint="select.subtitle"
        :label="msg.project[LANG]"
        item-text="title"
        item-value="subtitle"
        color="primary"
        :dark="true"
        single-line
        return-object
        persistent-hint>
      </v-select>
      <create-update-project/>
    </el-col>
    <el-col :span="5">
      <v-menu v-if="appProject && (appRole === ROLES.admin.val || appRole === ROLES.developer.val)" bottom right>
        <v-btn flat fab small id="project_operation_btn" slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-if="appRole === ROLES.admin.val"
            @click="$bus.$emit('openEditProjectDialog', appProject.id)">
            <v-list-tile-title>{{ msg.edit[LANG] }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-if="appRole === ROLES.developer.val"
            @click="$bus.$emit('openAddNewProjectDialog')">
            <v-list-tile-title>{{ msg.create[LANG] }}</v-list-tile-title>
          </v-list-tile>
          <!-- TODO: create remove project ? -->
          <v-list-tile
            v-if="appRole === ROLES.developer.val"
            @click="$bus.$emit('openDeleteProjectDialog', appProject.id)">
            <v-list-tile-title>{{ msg.remove[LANG] }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </el-col>
  </el-row>
</template>
<script>
  import CreateUpdateProject from './crud/CreateUpdateProject'

  export default {
    name: 'app-project-select',
    components: {CreateUpdateProject},
    data () {
      return {
        select: [],
        msg: {
          project: {en: 'Project', ru: 'Проект'},
          create: {en: 'Create', ru: 'Создать проект'},
          edit: {en: 'Edit', ru: 'Редактировать'},
          remove: {en: 'Remove', ru: 'Удалить'}
        }
      }
    },
    methods: {
      switchProject ({title, subtitle, id}) {
        this.$store.dispatch('setProject', id)
        this.$store.dispatch('fetchTasks', {
          projectId: this.appProject.id,
          status: this.$store.getters.taskStatus
        })
      }
    },
    computed: {
      items () {
        let items = []
        if (this.appProjects) {
          for (let id in this.appProjects) {
            if (this.appProjects[id].emails[this.appUser.email]) {
              items.push({
                id: id,
                title: this.appProjects[id].title,
                subtitle: this.appProjects[id].subtitle
              })
            }
          }
          if (items.length && this.appRole === 'client') { // auto select project for client
            this.select = {
              title: items[0].title,
              subtitle: items[0].subtitle,
              id: items[0].id
            }
            this.$store.dispatch('setProject', items[0].id)
          }
        }
        return items
      }
    }
  }
</script>

<style type="text/css">
  #project_selector {
    width: 280px;
  }

  #project_operation_btn {
    margin-left: 20px;
    color: white;
    margin-top: 10px;
  }
</style>
