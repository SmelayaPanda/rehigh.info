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
                <div class="mt-3 mb-5">
                  <div v-html="props.row.description"></div>
                </div>
                <el-steps v-if="props.row.history" align-center space="140px">
                  <el-step
                    v-for="status in TASK_STATUSES"
                    v-if="props.row.history[status.val]"
                    :key="status.val"
                    :title="TASK_STATUSES[status.val][LANG]"
                    :description="props.row.history[status.val] | date(LANG)">
                  </el-step>
                </el-steps>
              </template>
            </el-table-column>
            <el-table-column label="" width="64">
              <template slot-scope="scope">
                <!--<v-menu-->
                  <!--:close-on-content-click="false"-->
                  <!--:nudge-width="200"-->
                  <!--v-model="taskProgressMenu"-->
                  <!--offset-x>-->
                    <v-progress-circular
                      v-if="scope.row.progress"
                      :size="44"
                      :width="3"
                      :value="scope.row.progress"
                      :rotate="-90"
                      slot="activator"
                      :color="scope.row.priority === TASK_PRIORITY.low.val ? 'success' :
                             (scope.row.priority === TASK_PRIORITY.middle.val ? 'primary' :
                             (scope.row.priority === TASK_PRIORITY.high.val ? 'error' : ''))">
                      {{ scope.row.progress }}
                    </v-progress-circular>
                  <!--<v-card style="padding: 10px">-->
                    <!--<v-slider :max="100" v-model="taskProgress" label="Progress"></v-slider>-->
                  <!--</v-card>-->
                <!--</v-menu>-->
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
                  {{ scope.row.deadline | date(LANG) }}
                </span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column :label="msg.days[LANG]" width="80">
              <template slot-scope="scope">
                ~{{ scope.row.time.plan | msTo('WD') }}
              </template>
            </el-table-column>
            <!-- TIMER -->
            <el-table-column
              v-if="ROLE === ROLES.admin.val"
              :label="msg.real[LANG]" width="130" align="center">
              <template v-if="TIMER.task" slot-scope="scope">
                <v-btn v-if="TIMER.task.id === scope.row.id && !TIMER.to"
                       @click="stopTaskTimer"
                       :key="scope.row.id"
                       :disabled="LOADING"
                       class="task_timer" flat>
                  <v-icon class="task_timer_icons">pause</v-icon>
                  <el-tag type="success" size="small">{{ scope.row.time.real | msTo('HMS') }}</el-tag>
                </v-btn>
                <v-btn v-else
                       @click="startTaskTimer(scope.row.id)"
                       :key="scope.row.id"
                       :disabled="LOADING"
                       class="task_timer" flat>
                  <v-icon class="task_timer_icons">play_arrow</v-icon>
                  <el-tag type="success" size="small">{{ scope.row.time.real | msTo('HMS') }}</el-tag>
                </v-btn>
                <br>
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
                  <v-btn fab flat small color="primary" class="operation_btn" slot="activator">
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile @click="$bus.$emit('openChangeTaskStatusDialog', scope.row.id)">
                      <v-list-tile-title>{{ msg.changeStatus[LANG] }}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      v-if="ROLE === ROLES.admin.val"
                      @click="$bus.$emit('openEditTaskDialog', scope.row.id)">
                      <v-list-tile-title>{{ msg.edit[LANG] }}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      v-if="ROLE === ROLES.admin.val"
                      @click="$bus.$emit('openDeleteTaskDialog', scope.row.id)">
                      <v-list-tile-title>{{ msg.remove[LANG] }}</v-list-tile-title>
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
        prevTimerTaskId: '',
        taskProgressMenu: true,
        taskProgress: 20,
        msg: {
          title: {en: 'Title', ru: 'Название'},
          days: {en: 'Plan (d)', ru: 'План (д)'},
          real: {en: 'Real (h)', ru: 'Время'},
          deadline: {en: 'Deadline', ru: 'Сдача'},
          price: {en: 'Price', ru: 'Цена'},
          payment: {en: 'Payment', ru: 'Оплачено'},
          changeStatus: {en: 'Change status', ru: 'Изменить статус'},
          edit: {en: 'Edit', ru: 'Редактировать'},
          remove: {en: 'Remove', ru: 'Удалить'}
        }
      }
    },
    methods: {
      changeCurPage (curPage) {
        this.curPage = curPage
      },
      changePageSize (size) {
        this.pageSize = size
      },
      async startTaskTimer (val) {
        if (this.TIMER && !this.TIMER.to) { // other task in progress
          await this.stopTaskTimer()
        }
        if (this.prevTimerTaskId === val) { // old task start
          await this.$store.dispatch('setTimer', {isTimerStart: true})
        } else { // new task start
          await this.$store.dispatch('setTimer', {
            isTimerStart: true,
            isNewTask: true,
            task: this.$store.getters.tasks[val]
          })
        }
        this.$bus.$emit('startTicTac')
        this.prevTimerTaskId = val
      },
      async stopTaskTimer () {
        await this.$store.dispatch('setTimer', {isTimerStop: true})
        this.$bus.$emit('stopTicTac')
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

  .operation_btn {
    margin-left: -10px;
  }

  .task_timer {
    color: $color-info;
  }

  .task_timer:hover {
    color: $color-primary;
    cursor: pointer;
  }

  .task_timer_icons {
    margin-left: -10px;
    margin-right: 4px;
  }
</style>
