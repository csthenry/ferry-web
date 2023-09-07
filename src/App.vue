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
/* el-step */
/* 进行中状态：圈线 */
.el-step__head.is-process {
  color: #409eff;
  border-color: #409eff;
}
/* 进行中状态：圈内 */
.el-step__head.is-process > .el-step__icon {
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
.el-step__head.is-process > .el-step__line i {
    width: 20%!important;
    border-width: 1px!important;
}
.el-step__head.is-success > .el-step__line i {
    width: 100%!important;
    border-width: 1px!important;
}
.el-step__head.is-finish > .el-step__line i {
    width: 100%!important;
    border-width: 1px!important;
}
</style>