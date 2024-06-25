<template>
  <div class="app-container">
    <!-- <div v-if="isLoadingStatus" /> -->
    <div v-loading="isLoadingStatus">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-d-arrow-right" style="margin-right: 10px;" />流程跟踪</span>
        </div>
        <div class="text item">
          <el-steps v-if="currentNode.clazz !== undefined && currentNode.clazz !== null && currentNode.clazz !== ''" id="process-trace" :active="activeIndex" align-center finish-status="success">
            <template v-for="(item, index) in nodeStepList">
              <!-- 以success形式展示除当前节点外的未隐藏节点  -->
              <el-step
                v-if="(item.isHideNode === false ||
                  item.isHideNode === undefined ||
                  item.isHideNode == null) &&
                  item.id !== processStructureValue.workOrder.current_state"
                :key="index"
                :title="item.label"
                :status="stepIsEnd && index + 1 === activeIndex ? 'finish' : ''"
                :description="stepHistoryList[item.id] ? stepHistoryList[item.id] : ''"
              />
              <!-- 终止状态的节点单独以error形式展示  注：若流程已终止，则终止节点一定为当前节点-->
              <el-step
                v-else-if="stepIsEnd && item.id === processStructureValue.workOrder.current_state"
                :key="index"
                :title="item.label"
                description="未通过：流程已终止"
                status="error"
              />
              <!-- 以process/success形式展示当前节点 -->
              <el-step
                v-else-if="item.id === processStructureValue.workOrder.current_state"
                :key="index"
                :title="item.label"
              />
              <!-- 除以上情况外，剩余的即为隐藏的非当前节点，不展示 -->
            </template>
          </el-steps>
          <div v-else>
            <el-alert
              show-icon
              title="未找到当前工单流程信息，请确认当前工单绑定的流程是否存在。"
              type="warning"
            />
          </div>
        </div>
      </el-card>

      <el-alert
        v-if="activeIndex !== nodeStepList.length && processStructureValue.workOrder.is_end === 1"
        style="margin-top: 15px"
        :title="alertMessage"
        type="error"
        :closable="false"
      />

      <el-card class="box-card" style="margin-top: 15px;">
        <div slot="header" class="clearfix" style="display: flex; align-items: center; line-height: 28px; flex-wrap: wrap;">
          <span><i class="el-icon-edit" style="margin-right: 5px;" />工单标题：</span>
          <span>{{ processStructureValue.workOrder.title }}</span>
          <el-divider direction="vertical" />
          <span><i class="el-icon-warning-outline" style="margin-right: 5px;" />工单优先级：</span>
          <el-tag v-if="processStructureValue.workOrder.priority === 2" type="warning">优先</el-tag>
          <el-tag v-else-if="processStructureValue.workOrder.priority === 3" type="danger">紧急</el-tag>
          <el-tag v-else type="success">普通</el-tag>
          <el-divider direction="vertical" />
          <span><i class="el-icon-user" style="margin-right: 5px;" />申请人：</span>
          <el-avatar icon="el-icon-user-solid" size="small" style="margin-right: 5px;" :src="processStructureValue.workOrder.creator_avatar" />
          <span>{{ processStructureValue.workOrder.creator_name }}</span>
          <el-divider direction="vertical" />
          <span><i class="el-icon-time" style="margin-right: 5px;" />创建时间：</span>
          <span>{{ processStructureValue.workOrder.create_time }}</span>
        </div>

        <div class="text item">
          <template v-for="(tplItem, tplIndex) in processStructureValue.tpls">
            <fm-generate-form
              v-show="currentNode.hideTpls===undefined ||
                currentNode.hideTpls===null ||
                currentNode.hideTpls.indexOf(tplItem.form_structure.id)===-1"
              :key="tplIndex"
              :ref="'generateForm-'+tplItem.id"
              :preview="!!((currentNode.hideTpls!==undefined &&
                currentNode.hideTpls!==null &&
                currentNode.hideTpls.indexOf(tplItem.form_structure.id)!==-1) ||
                (currentNode.writeTpls===undefined ||
                currentNode.writeTpls===null ||
                currentNode.writeTpls.indexOf(tplItem.form_structure.id)===-1 ||
                !processStructureValue.userAuthority) ||
                (isActiveProcessing && currentNode.activeOrder))"
              :remote="remoteFunc"
              :value="tplItem.form_data"
              :data="tplItem.form_structure"
            />
          </template>
        </div>
      </el-card>
      <el-card v-if="processStructureValue.userAuthority" class="box-card" style="margin-top: 15px;">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-finished" style="margin-right: 10px;" />处理工单</span>
        </div>
        <div>
          <el-input
            v-model="remarks"
            type="textarea"
            placeholder="请输入备注信息"
            maxlength="200"
            :autosize="{ minRows: 3, maxRows: 99 }"
            show-word-limit
          />
        </div>
        <div class="text item" style="text-align: center;margin-top:18px">
          <div
            v-if="isActiveProcessing && currentNode.activeOrder"
          >
            <el-button
              v-permisaction="['process:list:handle:active']"
              type="primary"
              @click="activeOrderActive"
            >
              主动接单
            </el-button>
          </div>
          <div v-else>
            <template v-for="(item, index) in processStructureValue.edges">
              <el-button
                v-if="processStructureValue.workOrder.is_end === 0 && item.source === currentNode.id"
                :key="index"
                type="primary"
                @click="submitAction(item)"
              >
                {{ item.label }}
              </el-button>
            </template>
          </div>
        </div>
      </el-card>

      <el-card class="box-card" style="margin-top: 15px">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-refresh" style="margin-right: 10px;" />工单流转历史</span>
        </div>
        <el-steps :active="processStructureValue.workOrder.is_end === 1 ? 3 : circulationHistoryList.length > 0 ? 1 : 0" finish-status="success" simple style="margin-bottom: 20px;">
          <el-step title="流程开始" />
          <el-step title="工单流转中" />
          <el-step title="流程结束" />
        </el-steps>
        <div class="text item">
          <el-table
            :data="circulationHistoryList"
            max-height="300"
            border
            style="width: 100%"
          >
            <el-table-column label="状态" width="100" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === 0" size="small" type="danger">未通过</el-tag>
                <el-tag v-else-if="scope.row.status === 1" size="small" type="success">已通过</el-tag>
                <el-tag v-else size="small" type="warning">已完成</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="state"
              label="节点"
            />
            <el-table-column
              prop="circulation"
              label="流转"
            />
            <el-table-column
              prop="processor"
              label="处理人"
            />
            <el-table-column
              prop="create_time"
              label="处理时间"
            />
            <el-table-column
              label="备注"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.remarks && scope.row.remarks.length > 0" style="white-space: normal;height:auto;">
                  {{ scope.row.remarks }}
                </el-tag>
                <el-tag v-else type="info" style="white-space: normal;height:auto;">暂无备注</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  GenerateForm
} from '@/components/VueFormMaking'
import 'form-making/dist/FormMaking.css'
Vue.component(GenerateForm.name, GenerateForm)

import {
  processStructure,
  handleWorkOrder,
  activeOrder
} from '@/api/process/work-order'

import { mapGetters } from 'vuex'
import { listUser } from '@/api/system/sysuser'
import { getDeptList } from '@/api/system/dept'
import { listRole } from '@/api/system/role'
import { listPost } from '@/api/system/post'

export default {
  data() {
    return {
      isLoadingStatus: true,
      currentNode: {
        hideTpls: null,
        writeTpls: null
      },
      isActiveProcessing: false,
      tpls: [],
      remarks: '', // 备注信息
      alertMessage: '',
      stepIsEnd: false, // 该变量表明流程是否在中途被终止（不通过）
      nodeStepList: [],
      circulationHistoryList: [],
      stepHistoryList: [], // 步骤条历史（id, 处理人, 处理时间）
      activeIndex: 0,
      processStructureValue: {
        workOrder: { title: '' }
      },
      ruleForm: {
        title: '',
        process: '',
        classify: '',
        state_id: '',
        state: '',
        source_state: '',
        processor: '',
        process_method: '',
        tpls: [],
        tasks: []
      },
      remoteFunc: {
        // 获取用户列表
        async userList(resolve) {
          const res = await listUser({
            pageSize: 999999
          })
          const options = res.data.list
          resolve(options)
        },
        async deptTreeList(resolve) {
          const res = await getDeptList()
          resolve(res.data)
        },
        async roleList(resolve) {
          const res = await listRole({
            pageSize: 999999
          })
          resolve(res.data.list)
        },
        async postList(resolve) {
          const res = await listPost({
            pageSize: 999999
          })
          resolve(res.data.list)
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created() {
    this.getProcessNodeList()
  },
  methods: {
    getProcessNodeList() {
      processStructure({
        processId: this.$route.query.processId,
        workOrderId: this.$route.query.workOrderId
      }).then(response => {
        this.isActiveProcessing = false
        this.processStructureValue = response.data
        this.circulationHistoryList = this.processStructureValue.circulationHistory
        // 维护步骤条历史
        for (let i = 0; i < this.circulationHistoryList.length; i++) {
          const item = this.circulationHistoryList[i]
          const cirSource = item['source']
          this.stepHistoryList[cirSource] = '[' + item['processor'] + '] ' + item['update_time']
        }
        // 获取当前展示节点列表
        this.nodeStepList = []
        if (this.processStructureValue.nodes) {
          for (var i = 0; i < this.processStructureValue.nodes.length; i++) {
            if (this.processStructureValue.nodes[i].id === this.processStructureValue.workOrder.current_state) {
              // 当前节点
              this.nodeStepList.push(this.processStructureValue.nodes[i])
              this.activeIndex = this.nodeStepList.length - 1
              if (i + 1 === this.processStructureValue.nodes.length) {
                this.activeIndex = this.nodeStepList.length
              }
              this.currentNode = this.processStructureValue.nodes[i]
            } else if (!this.processStructureValue.nodes[i].isHideNode) {
              // 非隐藏节点
              this.nodeStepList.push(this.processStructureValue.nodes[i])
            }
          }
        }

        // 如果回退到初始节点则可编辑。
        if (this.activeIndex === 0 && this.currentNode.clazz === 'start') {
          this.currentNode.writeTpls = []
          for (var tplTmp of this.processStructureValue.tpls) {
            this.currentNode.writeTpls.push(tplTmp.form_structure.id)
          }
        }

        // 判断是否需要主动处理
        for (var stateValue of this.processStructureValue.workOrder.state) {
          if (this.processStructureValue.workOrder.current_state === stateValue.id && stateValue.processor.length > 1) {
            this.isActiveProcessing = true
            break
          }
        }
        this.isLoadingStatus = false
        this.getAlertMessage()
      })
    },
    submitAction(item) {
      var promiseList = []
      this.tpls = []
      for (var tpl of this.processStructureValue.tpls) {
        this.tpls.push({
          tplDataId: tpl.id,
          tplId: tpl.form_structure.id
        })
        promiseList.push(this.$refs['generateForm-' + tpl.id][0].getData())
      }
      Promise.all(promiseList).then(values => {
        for (var tplDataIndex in this.tpls) {
          this.tpls[tplDataIndex].tplValue = values[tplDataIndex]
        }
        handleWorkOrder({
          tasks: this.processStructureValue.process.task,
          source_state: this.processStructureValue.workOrder.current_state,
          target_state: item.target,
          circulation: item.label,
          flow_properties: item.flowProperties === undefined ? 2 : parseInt(item.flowProperties),
          work_order_id: parseInt(this.$route.query.workOrderId),
          remarks: this.remarks,
          is_exec_task: item.isExecuteTask,
          tpls: this.tpls
        }).then(response => {
          if (response.code === 200) {
          // this.$router.push({ name: 'upcoming' })
          // window.location.reload()
            this.$message({
              message: '数据提交成功',
              type: 'success'
            })
            this.getProcessNodeList()
          }
        })
      })
    },
    // 获取提示消息
    getAlertMessage() {
      if (this.processStructureValue.workOrder.is_end === 1) {
        this.alertMessage = '当前工单已结束。'
        if (this.activeIndex !== this.nodeStepList.length) {
          this.stepIsEnd = true // 排除所有流程流程已完结的情况
        }
      }
    },
    activeOrderActive() {
      var jsonData = [{
        id: this.nodeStepList[this.activeIndex].id,
        label: this.nodeStepList[this.activeIndex].label,
        process_method: 'person',
        processor: [this.userId]
      }]
      activeOrder(jsonData, this.$route.query.workOrderId).then(() => {
        this.getProcessNodeList()
      })
    }
  }
}
</script>
