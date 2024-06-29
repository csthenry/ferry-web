<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8" :xs="24">
        <el-card v-loading="loading" class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <div class="text-center">
              <userAvatar :user="user" />
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon icon-class="user" /> 用户名称
                <div class="pull-right">{{ user.username }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="phone" /> 手机号码
                <div class="pull-right">{{ user.phone ? user.phone : "--" }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" /> 用户邮箱
                <div class="pull-right">{{ user.email ? user.email : "--" }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="peoples" /> 所属角色
                <div class="pull-right">{{ roleName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="tree" /> 所属部门
                <div class="pull-right">{{ deptName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="excel" /> 所属岗位
                <div class="pull-right">{{ postName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" /> 创建日期
                <div class="pull-right">{{ parseTime(user.create_time) }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16" :xs="24">
        <el-card v-loading="loading">
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo :user="user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd :user="user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userAvatar from './userAvatar'
import userInfo from './userInfo'
import resetPwd from './resetPwd'
import { getUserProfile } from '@/api/system/sysuser'
import { getDeptList } from '@/api/system/dept'

export default {
  name: 'Profile',
  components: { userAvatar, userInfo, resetPwd },
  data() {
    return {
      loading: true,
      user: {},
      roleGroup: {},
      postGroup: {},
      deptGroup: {},
      activeTab: 'userinfo',
      roleIds: undefined,
      postIds: undefined,
      roleName: '',
      postName: '',
      deptList: [],
      deptName: ''
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data
        this.roleIds = response.roleIds
        this.postIds = response.postIds
        this.roleGroup = response.roles
        this.postGroup = response.posts

        if (this.roleIds[0]) {
          for (const key in this.roleGroup) {
            if (this.roleIds[0] === this.roleGroup[key].roleId) {
              this.roleName = this.roleGroup[key].roleName
            }
          }
        } else {
          this.roleName = '暂无'
        }
        if (this.postIds[0]) {
          for (const key in this.postGroup) {
            if (this.postIds[0] === this.postGroup[key].postId) {
              this.postName = this.postGroup[key].postName
            }
          }
        } else {
          this.postName = '暂无'
        }

        // 获取部门信息
        const deptPath = response.dept.deptPath.slice(1).split('/')
        deptPath.shift() // 删除根节点
        getDeptList().then(response => {
          this.deptList = response.data
          let currentDept = {} // 记录当前部门对象
          for (const deptId of deptPath) {
            if (JSON.stringify(currentDept) !== '{}') {
              for (const idx in currentDept.children) {
                if (deptId == currentDept.children[idx].deptId) {
                  this.deptName += ' / ' + currentDept.children[idx].deptName
                  currentDept = currentDept.children[idx]
                  break
                }
              }
            } else {
              for (const idx in this.deptList) {
                if (deptId == this.deptList[idx].deptId) {
                  this.deptName += this.deptList[idx].deptName
                  currentDept = this.deptList[idx]
                  break
                }
              }
            }
          }
          this.loading = false
        })
      })
    }
  }
}
</script>
