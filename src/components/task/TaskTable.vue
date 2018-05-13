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
                        class="success--text">fiber_manual_record
                </v-icon>
                <v-icon v-if="scope.row.priority === TASK_PRIORITY.middle.val"
                        class="primary--text">fiber_manual_record
                </v-icon>
                <v-icon v-if="scope.row.priority === TASK_PRIORITY.high.val"
                        class="error--text">fiber_manual_record
                </v-icon>
              </template>
            </el-table-column>
            <el-table-column :label="msg.title[LANG]">
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="msg.deadline[LANG]" width="140">
              <template slot-scope="scope">
                <span v-if="scope.row.deadline">
                  {{ scope.row.deadline | date('en') }}
                </span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column :label="msg.days[LANG]" width="80">
              <template slot-scope="scope">
                ~{{ (scope.row.time.plan / 8).toFixed(1) }}
              </template>
            </el-table-column>
            <el-table-column
              v-if="appRole === ROLES.admin.val || appRole === ROLES.developer.val"
              :label="msg.real[LANG]" width="100">
              <template slot-scope="scope">
                {{ scope.row.time.real }}
              </template>
            </el-table-column>
            <el-table-column :label="msg.price[LANG]" width="92">
              <template slot-scope="scope">
                <span>{{ scope.row.price.amount }} <span v-html="RUB"></span></span>
              </template>
            </el-table-column>
            <el-table-column :label="msg.payment[LANG]" width="92">
              <template slot-scope="scope">
                <span>{{ scope.row.payment.amount }} <span v-html="RUB"></span></span>
              </template>
            </el-table-column>
            <el-table-column width="46" align="left">
              <template slot-scope="scope">
                <v-menu bottom left>
                  <v-icon slot="activator">more_vert</v-icon>
                  <v-list>
                    <v-list-tile v-if="changeStatusAvailability" @click="">
                      <v-list-tile-title>{{ msg.changeStatus[LANG] }}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile v-if="appRole === ROLES.developer.val || appRole === ROLES.admin.val"
                                 @click="$bus.$emit('openEditTaskDialog', scope.row.id)">
                      <v-list-tile-title>{{ msg.edit[LANG] }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </template>
            </el-table-column>
          </el-table>
          <el-row v-if="totalTaskCount" type="flex" justify="start" id="task_pagination">
            <el-pagination
              @current-change="changeCurPage"
              @size-change="changePageSize"
              background
              layout="sizes, prev, pager, next, total"
              :current-page.sync="curPage"
              :page-size="pageSize"
              :page-sizes="[5, 10, 20, 50, 100]"
              :total="totalTaskCount">
            </el-pagination>
          </el-row>
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
        curPage: 1,
        pageSize: 10,
        msg: {
          title: {en: 'Title', ru: 'Название'},
          days: {en: 'Plan (d)', ru: 'План (д)'},
          real: {en: 'Real (h)', ru: 'Реально (ч)'},
          deadline: {en: 'Deadline', ru: 'Сдача'},
          price: {en: 'Price', ru: 'Цена'},
          payment: {en: 'Payment', ru: 'Оплачено'},
          changeStatus: {en: 'Change status', ru: 'Изменить статус'},
          edit: {en: 'Edit', ru: 'Редактировать'}
        }
      }
    },
    methods: {
      changeCurPage (curPage) {
        this.curPage = curPage
      },
      changePageSize (size) {
        this.pageSize = size
      }
    },
    computed: {
      tasks () {
        if (this.$store.getters.tasks) {
          return Object.values(this.$store.getters.tasks)
            .slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize)
        } else {
          return []
        }
      },
      taskStatus () {
        return this.$store.getters.taskStatus
      },
      totalTaskCount () {
        return this.$store.getters.tasks ? Object.keys(this.$store.getters.tasks).length : 0
      },
      changeStatusAvailability () {
        if (this.appRole === this.ROLES.client.val && this.taskStatus === this.TASK_STATUSES.created.val) {
          return true
        } else {
          return (this.appRole === this.ROLES.admin.val || this.appRole === this.ROLES.developer.val) &&
        this.taskStatus !== this.TASK_STATUSES.created.val
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .task_card {
    padding: 10px;
  }

  #task_pagination {
    padding: 10px;
  }
</style>
