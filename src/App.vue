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
.el-step__head.is-process {
    color: #409eff;
    border-color: #409eff;
}
.el-step__title.is-process {
    color: #409eff;
}
</style>