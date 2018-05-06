<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <el-table
            :data="tableData"
            show-overflow-tooltip
            :row-class-name="tableRowClassName"
            :default-sort="{prop: 'deadline', order: 'descending'}"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-tag type="success" size="small">ID: {{ props.row.id }}</el-tag>
                <br>
                <el-tag v-for="type in props.row.type" :key="type" size="small" class="mb-2 mt-2 mr-1">
                  {{ type }}
                </el-tag>
                <p>State: {{ props.row.description }}</p>
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
            <el-table-column label="Title" sortable>
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Plan (h)" width="100" sortable>
              <template slot-scope="scope">
                {{ scope.row.time.plan / 100000 }}
              </template>
            </el-table-column>
            <el-table-column label="Real (h)" width="100" sortable>
              <template slot-scope="scope">
                {{ scope.row.time.real / 100000 }}
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
      return {
        type: [
          {text: 'Vue', value: 'vue'},
          {text: 'CSS', value: 'css'},
          {text: 'HTML', value: 'html'}
        ],
        tableData: [{
          id: 'YSJHDSDySD78SD65',
          project: 'misterio',
          title: 'Task no 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut doloribus excepturi laborum quam',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut doloribus excepturi laborum quam quasi reiciendis saepe? A dicta enim esse ipsam labore nisi possimus, repellendus! Aspernatur minus quis saepe sit.',
          priority: 'low', // high | middle | low
          price: {amount: 467, currency: 'RUB'},
          payment: {amount: 0, currency: 'RUB'},
          time: {
            plan: 360000, // milisecons
            real: 0
          },
          status: 'pending', // created | pending | started | finished | accepted | archived | stopped
          history: {
            created: new Date(),
            pending: new Date(),
            started: new Date(),
            finished: new Date(),
            accepted: new Date(),
            stopped: new Date() // last
          },
          deadline: new Date(),
          type: ['vue', 'css'],
          comments: [
            {userId: '', date: new Date(), text: ''}
          ]
        }]
      }
    },
    methods: {
      tableRowClassName ({row, rowIndex}) {
        if (row.status === 'pending') {
          return ''
        } else if (row.status === 'started') {
          return 'success-row'
        }
        return ''
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
