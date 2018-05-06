<template>
  <div>
    <v-layout row wrap id="task_header">
      <v-flex xs12>
        Task
      </v-flex>
    </v-layout>
  <v-container>
    <v-layout row wrap>
    <v-flex xs12>
      <el-card>
        <el-table
          :data="tableData"
          :row-class-name="tableRowClassName"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <p>State: {{ props.row.state }}</p>
              <p>City: {{ props.row.city }}</p>
              <p>Address: {{ props.row.address }}</p>
              <p>Zip: {{ props.row.zip }}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="Date"
            prop="date">
          </el-table-column>
          <el-table-column
            label="Name"
            prop="name">
          </el-table-column>
        </el-table>
      </el-card>
    </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
  export default {
    name: 'task-table',
    data () {
      return {
        tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-08',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-06',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-07',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }]
      }
    },
    methods: {
      tableRowClassName ({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      }
    }
  }
</script>

<style scoped lang="scss">
  #task_header {
    background: $color-primary;
  }
</style>
