import Element from 'element-ui'

// Fixes an issue with filters not working on mobile
Element.Select.computed.readonly = function() {
  // trade-off for IE input readonly problem: https://github.com/ElemeFE/element/issues/10403
  const isIE = !this.$isServer && !Number.isNaN(Number(document.documentMode))

  // return !this.filterable || this.multiple || !isIE && !this.visible || !this.remote;
  return !this.filterable || this.multiple || !isIE && !this.visible && !this.remote
}

export default Element
