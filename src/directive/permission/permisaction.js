import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  const all_permission = '*:*:*' // 超级管理员后端均返回全权限（权限设置对超管不生效）
  const permissions = store.getters && store.getters.permisaction

  if (value && value instanceof Array && value.length > 0) {
    const permissionFlag = value
    const hasPermissions = permissions.some(permission => {
      return all_permission === permission || permissionFlag.includes(permission)
    })
    if (!hasPermissions) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(`need permission! Like v-permission="['process:list:all:select']"`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
