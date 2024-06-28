<template>
  <el-container class="fm2-container">
    <el-main class="fm2-main">
      <el-container>
        <el-aside width="250px">
          <div class="components-list">
            <template v-if="basicFields.length">
              <div class="widget-cate">{{ $t('fm.components.basic.title') }}</div>
              <draggable
                tag="ul"
                :list="basicComponents"
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                :move="handleMove"
                @end="handleMoveEnd"
                @start="handleMoveStart"
              >
                <template v-for="(item, index) in basicComponents">
                  <li v-if="basicFields.indexOf(item.type)>=0" :key="index" class="form-edit-widget-label" :class="{'no-put': item.type === 'divider'}">
                    <a>
                      <i class="icon iconfont" :class="item.icon" />
                      <span>{{ item.name }}</span>
                    </a>
                  </li>
                </template>

              </draggable>
            </template>

            <template v-if="advanceFields.length">
              <div class="widget-cate">{{ $t('fm.components.advance.title') }}</div>
              <draggable
                tag="ul"
                :list="advanceComponents"
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                :move="handleMove"
                @end="handleMoveEnd"
                @start="handleMoveStart"
              >
                <template v-for="(item, index) in advanceComponents">
                  <li v-if="advanceFields.indexOf(item.type) >= 0" :key="index" class="form-edit-widget-label" :class="{'no-put': item.type === 'table'}">
                    <a>
                      <i class="icon iconfont" :class="item.icon" />
                      <span>{{ item.name }}</span>
                    </a>
                  </li>
                </template>

              </draggable>
            </template>

            <template v-if="layoutFields.length">
              <div class="widget-cate">{{ $t('fm.components.layout.title') }}</div>
              <draggable
                tag="ul"
                :list="layoutComponents"
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                :move="handleMove"
                @end="handleMoveEnd"
                @start="handleMoveStart"
              >
                <template v-for="(item, index) in layoutComponents">
                  <li v-if="layoutFields.indexOf(item.type) >=0" :key="index" class="form-edit-widget-label no-put">
                    <a>
                      <i class="icon iconfont" :class="item.icon" />
                      <span>{{ item.name }}</span>
                    </a>
                  </li>
                </template>

              </draggable>
            </template>

          </div>

        </el-aside>
        <el-container class="center-container" direction="vertical">
          <el-header class="btn-bar" style="height: 45px;">
            <slot name="action" />
            <el-button v-if="upload" type="text" size="medium" icon="el-icon-upload2" @click="handleUpload">{{ $t('fm.actions.import') }}</el-button>
            <el-button v-if="clearable" type="text" size="medium" icon="el-icon-delete" @click="handleClear">{{ $t('fm.actions.clear') }}</el-button>
            <el-button v-if="preview" type="text" size="medium" icon="el-icon-view" @click="handlePreview">{{ $t('fm.actions.preview') }}</el-button>
            <el-button v-if="generateJson" type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">{{ $t('fm.actions.json') }}</el-button>
            <el-button v-if="generateCode" type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">{{ $t('fm.actions.code') }}</el-button>
          </el-header>
          <el-main :class="{'widget-empty': widgetForm.list.length === 0}">

            <widget-form v-if="!resetJson" ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect" />
          </el-main>
        </el-container>

        <el-aside class="widget-config-container" style="width: 305px;">
          <el-container>
            <el-header height="45px">
              <div class="config-tab" :class="{active: configTab==='widget'}" @click="handleConfigSelect('widget')">{{ $t('fm.config.widget.title') }}</div>
              <div class="config-tab" :class="{active: configTab==='form'}" @click="handleConfigSelect('form')">{{ $t('fm.config.form.title') }}</div>
            </el-header>
            <el-main class="config-content">
              <widget-config v-if="widgetFormSelect!==null" v-show="configTab==='widget'" :data="widgetFormSelect" />
              <form-config v-show="configTab==='form'" :data="widgetForm.config" />
            </el-main>
          </el-container>

        </el-aside>

        <cus-dialog
          ref="widgetPreview"
          :visible="previewVisible"
          width="1000px"
          form
          @on-close="previewVisible = false"
        >
          <generate-form
            v-if="previewVisible"
            ref="generateForm"
            insite="true"
            :data="widgetForm"
            :value="widgetModels"
            :remote="remoteFuncs"
            @on-change="handleDataChange"
          >

            <template slot-scope="scope">
              Width <el-input v-model="scope.model.blank.width" style="width: 100px" />
              Height <el-input v-model="scope.model.blank.height" style="width: 100px" />
            </template>
          </generate-form>

          <template slot="action">
            <el-button type="primary" @click="handleTest">{{ $t('fm.actions.getData') }}</el-button>
            <el-button @click="handleReset">{{ $t('fm.actions.reset') }}</el-button>
          </template>
        </cus-dialog>

        <cus-dialog
          ref="uploadJson"
          :visible="uploadVisible"
          width="800px"
          form
          @on-close="uploadVisible = false"
          @on-submit="handleUploadJson"
        >
          <el-alert type="info" style="margin-bottom: 10px;" :title="$t('fm.description.uploadJsonInfo')" />
          <codemirror
            ref="cmEditor"
            :value="jsonEg"
            :options="contentOptions"
            class="codemirror"
          />
        </cus-dialog>

        <cus-dialog
          ref="jsonPreview"
          :visible="jsonVisible"
          width="800px"
          form
          @on-close="jsonVisible = false"
        >
          <codemirror
            ref="cmEditor"
            :value="jsonTemplate"
            :options="contentOptions"
            class="codemirror"
          />
          <template slot="action">
            <el-button type="primary" class="json-btn" :data-clipboard-text="jsonCopyValue">{{ $t('fm.actions.copyData') }}</el-button>
          </template>
        </cus-dialog>

        <cus-dialog
          ref="codePreview"
          :visible="codeVisible"
          width="800px"
          form
          :action="false"
          @on-close="codeVisible = false"
        >
          <codemirror
            ref="cmEditor"
            :value="htmlTemplate"
            :options="contentOptions"
            class="codemirror"
          />
        </cus-dialog>
      </el-container>
    </el-main>
    <el-footer height="30px" style="font-weight: 600;">Powered by Ferry (neo)</el-footer>
  </el-container>

</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import WidgetForm from './WidgetForm'
import CusDialog from './CusDialog'
import GenerateForm from './GenerateForm'
import Clipboard from 'clipboard'
import { basicComponents, layoutComponents, advanceComponents } from './componentsConfig.js'
import generateCode from './generateCode.js'

// 代码编辑器
import { codemirror } from 'vue-codemirror'
require('codemirror/mode/xml/xml') // 这里引入的模式的js，根据设置的mode引入
require('codemirror/mode/htmlmixed/htmlmixed') // 这里引入的模式的js，根据设置的mode引入

// 远端方法
import { listUser } from '@/api/system/sysuser'
import { getDeptList } from '@/api/system/dept'
import { listRole } from '@/api/system/role'
import { listPost } from '@/api/system/post'

export default {
  name: 'FmMakingForm',
  components: {
    Draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    CusDialog,
    GenerateForm,
    codemirror
  },
  props: {
    preview: {
      type: Boolean,
      default: false
    },
    generateCode: {
      type: Boolean,
      default: false
    },
    generateJson: {
      type: Boolean,
      default: false
    },
    upload: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    basicFields: {
      type: Array,
      default: () => ['input', 'textarea', 'number', 'radio', 'checkbox', 'time', 'date', 'rate', 'color', 'select', 'switch', 'slider', 'text']
    },
    advanceFields: {
      type: Array,
      default: () => ['blank', 'imgupload', 'editor', 'cascader']
    },
    layoutFields: {
      type: Array,
      default: () => ['grid', 'divider']
    }
  },
  data() {
    return {
      basicComponents,
      layoutComponents,
      advanceComponents,
      resetJson: false,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        }
      },
      contentOptions: {
        flattenSpans: false, // 默认情况下，CodeMirror会将使用相同class的两个span合并成一个。通过设置此项为false禁用此功能
        matchBrackets: true, // 匹配符号
        lineWiseCopyCut: true, // 如果在复制或剪切时没有选择文本，那么就会自动操作光标所在的整行
        tabSize: 4,
        value: '',
        mode: 'python',
        lineNumbers: true, // 显示行号
        line: true,
        smartIndent: true, // 智能缩进
        autoCloseBrackets: true, // 自动输入括弧
        foldGutter: true, // 允许在行号位置折叠
        indentUnit: 4, // 智能缩进单位为4个空格长度
        styleActiveLine: true // 激活当前行样式
      },
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false,
      remoteFuncs: {
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
      },
      widgetModels: {},
      blank: '',
      htmlTemplate: '',
      jsonTemplate: '',
      uploadVisible: false,
      jsonVisible: false,
      codeVisible: false,
      uploadEditor: null,
      jsonCopyValue: '',
      jsonClipboard: null,
      jsonEg: `{
  "list": [],
  "config": {
    "labelWidth": 100,
    "labelPosition": "top",
    "size": "small"
  }
}`
    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function(val) {
      }
    },
    '$i18n.locale': function(val) {
      this._loadComponents()
    }
  },
  mounted() {
    this._loadComponents()
  },
  methods: {
    _loadComponents() {
      this.basicComponents = this.basicComponents.map(item => {
        return {
          ...item,
          name: this.$t(`fm.components.fields.${item.type}`)
        }
      })
      this.advanceComponents = this.advanceComponents.map(item => {
        return {
          ...item,
          name: this.$t(`fm.components.fields.${item.type}`)
        }
      })
      this.layoutComponents = this.layoutComponents.map(item => {
        return {
          ...item,
          name: this.$t(`fm.components.fields.${item.type}`)
        }
      })
    },
    handleConfigSelect(value) {
      this.configTab = value
    },
    handleMoveEnd(evt) {
    },
    handleMoveStart({ oldIndex }) {
    },
    handleMove() {
      return true
    },
    handlePreview() {
      this.previewVisible = true
    },
    handleTest() {
      this.$refs.generateForm.getData().then(data => {
        this.$alert(data, '').catch(e => {})
        this.$refs.widgetPreview.end()
      }).catch(e => {
        this.$refs.widgetPreview.end()
      })
    },
    handleReset() {
      this.$refs.generateForm.reset()
    },
    handleGenerateJson() {
      this.jsonVisible = true
      this.jsonTemplate = JSON.stringify(this.widgetForm, null, 2)
      this.$nextTick(() => {
        this.$refs.cmEditor.codemirror.setOption('mode', 'application/json')

        if (!this.jsonClipboard) {
          this.jsonClipboard = new Clipboard('.json-btn')
          this.jsonClipboard.on('success', (e) => {
            this.$message.success(this.$t('fm.message.copySuccess'))
          })
        }
        this.jsonCopyValue = JSON.stringify(this.widgetForm, null, 2)
      })
    },
    handleGenerateCode() {
      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {
        this.$refs.cmEditor.codemirror.setOption('mode', 'text/html')
      })
    },
    handleUpload() {
      this.uploadVisible = true
      this.$nextTick(() => {
        this.$refs.cmEditor.codemirror.setOption('mode', 'application/json')
      })
    },
    handleUploadJson() {
      try {
        this.setJSON(JSON.parse(this.$refs.cmEditor.codemirror.getValue()))
        this.uploadVisible = false
      } catch (e) {
        this.$message.error(e.message)
        this.$refs.uploadJson.end()
      }
    },
    handleClear() {
      this.widgetForm = {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small',
          customClass: ''
        }
      }

      this.widgetFormSelect = {}
    },
    getJSON() {
      return this.widgetForm
    },
    getHtml() {
      return generateCode(JSON.stringify(this.widgetForm))
    },
    setJSON(json) {
      this.widgetForm = json

      if (json.list.length > 0) {
        this.widgetFormSelect = json.list[0]
      }
    },
    handleInput(val) {
      this.blank = val
    },
    handleDataChange(field, value, data) {
    }
  }
}
</script>

<style lang="scss">
.widget-empty{
  background-position: 50%;
}

aside {
  background: #ffffff;
  padding: 0;
  margin-bottom: 0;

  a {
    color: #333333;
  }
}
</style>

<style scoped>
  .codemirror {
    line-height: 150%;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    overflow: hidden;
  }
</style>
