<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}

</script>

<style>
@import url("./assets/fonts/harmonyos.css");
body, button, input, optgroup, select, textarea {
  font-family: "HarmonyOS Sans SC", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;
}

.el-button--primary {
  background-color: #005eeb;
  border-color: #005eeb;
}
/* el-step */
/* 进行中状态：圈线 */
.el-step__head.is-process {
  color: #409eff;
  border-color: #409eff;
}
/* 进行中状态：圈内 */
#process-trace .el-step__head.is-process > .el-step__icon {
  background: #409eff;
  color: #fff;
}
/* 进行中状态：文字 */
.el-step__title.is-process {
  color: #409eff;
}
.el-step__description.is-process {
  color: #409eff;
}
/* 完成状态：圈线 */
.el-step__head.is-finish {
  color: #ffab40;
  border-color: #ffab40;
}
/* 通过状态：圈内 */
.el-step__head.is-finish > .el-step__icon {
  background: #fbf5d5;
}
/* 通过状态：文字 */
.el-step__title.is-finish {
  color: #ffab40;
}
.el-step__description.is-finish {
  color: #ffab40;
}
/* 通过状态：圈内 */
.el-step__head.is-success > .el-step__icon {
  background: #ecffed;
}
/* 终止（不通过）状态：圈线 */
.el-step__head.is-error {
  color: #F56C6C;
  border-color: #F56C6C;
}
/* 终止（不通过）状态：圈内 */
.el-step__head.is-error > .el-step__icon {
  background: #F56C6C;
  color: #ECF5FF;
}
/* 终止（不通过）状态：文字 */
.el-step__title.is-error {
  color: #F56C6C;
}
.el-step__description.is-error {
  color: #F56C6C;
}
/* 步骤条逻辑 */
#process-trace .el-step__head.is-process > .el-step__line i {
    width: 20%!important;
    border-width: 1px!important;
}
#process-trace .el-step__head.is-success > .el-step__line i {
    width: 100%!important;
    border-width: 1px!important;
}
#process-trace .el-step__head.is-finish > .el-step__line i {
    width: 100%!important;
    border-width: 1px!important;
}
#process-trace .el-step__title {
  margin: 10px auto;
  line-height: normal!important;
}
/* 文件上传 */
.el-upload {
  text-align: left;
}
/* 修复分页器组件移动端适配问题 */
@media screen and (max-width: 642px) {
  .el-pagination__total {
    display: none!important;
  }
  .el-pagination__jump {
    display: none!important;
  }
  .el-pagination .el-pager {
    display: none!important;
  }
}
/* 输入框图标垂直居中问题 */
.el-input__suffix {
  line-height: 100%;
}
::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 1px 1px 0 rgba(0,0,0,0.1), inset 0 -1px 0 rgba(0,0,0,0.07);
    background-clip: padding-box;
    background-color: #808080;
    min-height: 40px;
    padding-top: 100px;
    border-radius: 4px;
}
::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background: #e4e4e4;
}
</style>
