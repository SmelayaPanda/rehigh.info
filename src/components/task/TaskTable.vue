<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card v-if="tasks">
          <el-table
            :data="tasks"
            show-overflow-tooltip
            :default-sort="{prop: 'deadline', order: 'descending'}"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-tag type="success" size="small">ID: {{ props.row.id }}</el-tag>
                <br>
                <el-tag v-for="type in props.row.type" :key="type" size="small" class="mb-2 mt-2 mr-1">
                  {{ type }}
                </el-tag>
                <p>{{ props.row.description }}</p>
                <el-steps align-center space="140px" class="mt-3">
                  <el-step
                    v-if="props.row.history"
                    v-for="(date, status) in props.row.history" :key="status"
                    :title="status"
                    :description="date | date('en')">
                  </el-step>
                </el-steps>
              </template>
            </el-table-column>
            <el-table-column label="" width="34">
              <template slot-scope="scope">
                <v-icon v-if="scope.row.priority === TASK_PRIORITY.low.val"
                        class="success--text">fiber_manual_record</v-icon>
                <v-icon v-if="scope.row.priority === TASK_PRIORITY.middle.val"
                        class="primary--text">fiber_manual_record</v-icon>
                <v-icon v-if="scope.row.priority === TASK_PRIORITY.high.val"
                        class="error--text">fiber_manual_record</v-icon>
              </template>
            </el-table-column>
            <el-table-column label="Title">
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Deadline" width="140">
              <template slot-scope="scope">
                <span v-if="scope.row.deadline">
                  {{ scope.row.deadline | date('en') }}
                </span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column label="Days" width="60">
              <template slot-scope="scope">
                ~{{ (scope.row.time.plan / 8).toFixed(1) }}
              </template>
            </el-table-column>
            <el-table-column
              v-if="appRole === USER_ROLES.admin.val || appRole === USER_ROLES.developer.val"
              label="Real (h)" width="100">
              <template slot-scope="scope">
                {{ scope.row.time.real }}
              </template>
            </el-table-column>
            <el-table-column label="Price" width="92">
              <template slot-scope="scope">
                <span>{{ scope.row.price.amount }} <span v-html="RUB"></span></span>
              </template>
            </el-table-column>
            <el-table-column label="Payment" width="92">
              <template slot-scope="scope">
                <span>{{ scope.row.payment.amount }} <span v-html="RUB"></span></span>
              </template>
            </el-table-column>
            <el-table-column width="46" align="left">
              <template slot-scope="scope">
                <v-menu bottom left>
                  <v-icon slot="activator">more_vert</v-icon>
                  <v-list>
                    <v-list-tile @click="">
                      <v-list-tile-title>Chane status</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="">
                      <v-list-tile-title>Edit</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </template>
            </el-table-column>
          </el-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'task-table',
    data () {
      return {}
    },
    methods: {},
    computed: {
      tasks () {
        return this.$store.getters.tasks ? Object.values(this.$store.getters.tasks) : []
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
