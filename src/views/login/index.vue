<template>
  <div class="login-container">
    <!-- 粒子特效 -->
    <!-- <div id="particles-js">
      <vue-particles
        color="#dedede"
        :particle-opacity="0.7"
        :particles-number="80"
        shape-type="circle"
        :particle-size="4"
        lines-color="#dedede"
        :lines-width="1"
        :line-linked="true"
        :line-opacity="0.4"
        :lines-distance="150"
        :move-speed="3"
        :hover-effect="true"
        hover-mode="grab"
        :click-effect="true"
        click-mode="push"
      />
    </div> -->
    <div class="login-weaper animated bounceInDown">
      <div class="login-left">
        <!--        <div class="login-time" v-text="currentTime" />-->
        <el-tag v-show="currentTime && currentTime.length > 0" class="login-time">{{ currentTime }}</el-tag>
        <img :src="logo" alt="" class="img">
        <p class="title" v-text="title" />
        <span style="font-weight: 500;">现已接入字节星球 | 陌上花（moshanghua.net）</span>
      </div>
      <div class="login-border">
        <div class="login-main">
          <div class="login-title"> 用户登录 </div>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
            <el-form-item prop="username">
              <span class="svg-container">
                <i class="el-icon-user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="用户名"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="密码"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
            </el-tooltip>
            <template v-if="isVerifyCodeTmp">
              <el-form-item prop="code" style="width: 66%;float: left; margin-bottom: 13px">
                <span class="svg-container">
                  <svg-icon icon-class="validCode" />
                </span>
                <el-input
                  ref="username"
                  v-model="loginForm.code"
                  placeholder="验证码"
                  name="username"
                  type="text"
                  tabindex="3"
                  maxlength="5"
                  autocomplete="off"
                  style=" width: 75%;"
                  @keyup.enter.native="handleLogin"
                />
              </el-form-item>
              <div class="login-code" style="cursor:pointer; width: 30%;height: 48px;float: right;background-color: #f0f1f5;">
                <el-skeleton style="width: 100%" :loading="verifyCodeLoading" :count="1" animated>
                  <template slot="template">
                    <el-skeleton-item variant="button" style="width: 100%; height: 48px; border: 1px solid rgba(0,0,0, 0.1); border-radius:5px;" />
                  </template>
                  <template>
                    <img style="height: 48px;width: 100%;border: 1px solid rgba(0,0,0, 0.1);border-radius:5px;" :src="codeUrl" @click="getCode">
                  </template>
                </el-skeleton>
              </div>
            </template>
            <div prop="code" style="display: flex;align-items: center;width: 100%;float: left;margin-bottom: 13px">
              <el-switch
                v-if="openLdap"
                v-model="isLdapTmp"
                active-text="LDAP登录"
                active-color="#13ce66"
              />
              <el-popover
                placement="bottom"
                trigger="hover"
                title="初始账号信息"
                content="用户账号：同对应平台的账号；初始密码：注册时所用的邮箱"
              >
                <i slot="reference" class="el-icon-question" style="color: #1890ff;margin-left: 10px" />
              </el-popover>
            </div>
            <el-alert
              title="注意"
              type="warning"
              description="首次登录账号，请及时更改初始密码！"
              show-icon
            />
            <el-button round :loading="loading" type="primary" style="width:100%;padding:12px 20px;margin:20px 0;" @click.native.prevent="handleLogin">
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getCodeImg } from '@/api/login'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'LoginIndex',
  data() {
    return {
      verifyCodeLoading: true,
      isLdapTmp: false,
      openLdap: false,
      codeUrl: '',
      cookiePassword: '',
      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: '',
        loginType: 1
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' }
        ],
        code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      currentTime: null
    }
  },
  computed: {
    ...mapGetters(['title', 'logo', 'isLdap', 'isVerifyCode']),
    isVerifyCodeTmp: function() {
      if (this.isVerifyCode) {
        this.getCode()
      }
      return this.isVerifyCode
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    },
    isLdap: {
      handler: function(val) {
        // this.isLdapTmp = val
        // this.$nextTick可实现在DOM状态更新后，执行传入的方法。
        this.openLdap = val
      },
      immediate: true
    },
    isVerifyCode: {
      handler: function(val) {
        if (val) {
          this.getCode()
        }
      }
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    this.getCurrentTime()
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    clearInterval(this.timer)
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    getCurrentTime() {
      this.timer = setInterval(_ => {
        this.currentTime = moment().format('YYYY-MM-DD HH时mm分ss秒')
      }, 1000)
    },
    getCode() {
      this.verifyCodeLoading = true
      getCodeImg().then(res => {
        if (res !== undefined) {
          this.codeUrl = res.data
          this.loginForm.uuid = res.id
          this.verifyCodeLoading = false
        }
      })
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        this.capsTooltip = shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.isLdapTmp) {
            this.loginForm.loginType = 1
          } else {
            this.loginForm.loginType = 0
          }

          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              // this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.$router.push({ path: '/' })
              // this.loading = false
            })
            .catch(() => {
              this.loading = false
              this.getCode()
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$light_gray:#fff;
$cursor: #fff;

@media screen and (max-width: 1200px) {
  .login-left {
    display: none!important;
  }
  .login-weaper {
    width: 550px!important;
  }
  .login-border {
    width: 100%!important;
    border-radius: 10px!important;
  }
}
@media screen and (max-width: 570px) {
  .login-weaper {
    margin: 0 10px!important;
  }
}
@media screen and (max-width: 768px) {
  .login-main {
    width: 80%!important;
  }
}
.tips-button-container {
  overflow: hidden;
}
.tips-button-container .el-button {
  width: 100%;
}
.login-container{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: url("../../assets/login.png") no-repeat,radial-gradient(153.25% 257.2% at 118.99% 181.67%,rgba(50,132,255,.2) 0%,rgba(82,120,255,0) 100%),radial-gradient(123.54% 204.83% at 25.87% 195.17%,rgba(111,76,253,.15) 0%,rgba(122,76,253,0) 78.85%),linear-gradient(0deg,rgba(0,94,235,.03),rgba(0,94,235,.03)),radial-gradient(109.58% 109.58% at 31.53% -36.58%,rgba(0,94,235,.3) 0%,rgba(0,94,235,0) 100%),rgba(0,57,142,.05);
    position: relative;
    height: 100vh;
}

#particles-js{
    z-index: 1;
    width: 100%;
    height: 100%;
    position: absolute;
}

.login-weaper{
  margin: 0 auto;
  width: 1000px;
  -webkit-box-shadow: 0px 5px 20px 0px rgb(0 0 0 / 20%);
  box-shadow: 0px 5px 20px 0px rgb(0 0 0 / 20%);
  z-index: 1000;
  transition: .5s;
  border-radius: 10px;
}

.login-left{
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: transparent;
  color: #005eeb;
  float: left;
  width: 50%;
  position: relative;
    min-height: 545px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  .login-time{
    position: absolute;
    left: 25px;
    top: 25px;
    font-weight: 700;
    color: #005eeb;
    opacity: .9;
    overflow: hidden;
  }
}

.login-left .img{
  width: 120px;
  height: 120px;
  border-radius: 3px;
}

.login-left .title {
  text-align: center;
  color: #005eeb;
  font-size: 30px;
  font-weight: 600;
}

.login-border{
  position: relative;
    min-height: 545px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-left: none;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    color: #fff;
    background-color: #ffffff8c;
    width: 50%;
    float: left;
}

.login-main{
    margin: 40px auto;
    width: 65%;
    transition: .5s;
}

.login-title{
  color: #333;
    margin-bottom: 40px;
    font-weight: bold;
    font-size: 25px;
    text-align: center;
    letter-spacing: 4px;
}

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  ::v-deep .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #333;
      height: 47px;
      caret-color: #333;
    }
  }

  .el-form-item {
    border: 1px solid rgba(0,0,0, 0.1);
    background: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    color: #454545;
  }
  .el-alert{
    margin-top: 20px;
  }
}
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
