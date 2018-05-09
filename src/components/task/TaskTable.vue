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
            <el-table-column label="Priority / Title">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.priority === TASK_PRIORITY.low.val" type="success" size="mini">3</el-tag>
                <el-tag v-if="scope.row.priority === TASK_PRIORITY.middle.val" type="primary" size="mini">2</el-tag>
                <el-tag v-if="scope.row.priority === TASK_PRIORITY.high.val" type="danger" size="mini">1</el-tag>
                <span class="ml-2">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Plan (h)" width="100" sortable>
              <template slot-scope="scope">
                {{ scope.row.time.plan }}
              </template>
            </el-table-column>
            <el-table-column label="Real (h)" width="100" sortable>
              <template slot-scope="scope">
                {{ scope.row.time.real }}
              </template>
            </el-table-column>
            <el-table-column label="Deadline" width="160" sortable>
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span v-if="scope.row.deadline" style="margin-left: 5px">
                  {{ scope.row.deadline | date('en') }}
                </span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column label="Price" width="100" sortable>
              <template slot-scope="scope">
                <span>{{ scope.row.price.amount }} {{ scope.row.price.currency }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Payment" width="100" sortable>
              <template slot-scope="scope">
                <span>{{ scope.row.payment.amount }} {{ scope.row.payment.currency }}</span>
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
