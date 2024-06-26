export const basicComponents = [
  {
    type: 'input',
    icon: 'icon-input',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      placeholder: '',
      disabled: false,
      showPassword: false,
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  },
  {
    type: 'textarea',
    icon: 'icon-diy-com-textarea',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: '',
      placeholder: '',
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  },
  {
    type: 'number',
    icon: 'icon-number',
    options: {
      width: '',
      required: false,
      defaultValue: 0,
      min: '',
      max: '',
      step: 1,
      disabled: false,
      controlsPosition: '',
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  },
  {
    type: 'radio',
    icon: 'icon-radio-active',
    options: {
      inline: false,
      defaultValue: '',
      showLabel: false,
      options: [
        {
          value: 'Option 1',
          label: 'Option 1'
        },
        {
          value: 'Option 2',
          label: 'Option 2'
        },
        {
          value: 'Option 3',
          label: 'Option 3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false,
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  },
  {
    type: 'checkbox',
    icon: 'icon-check-box',
    options: {
      inline: false,
      defaultValue: [],
      showLabel: false,
      options: [
        {
          value: 'Option 1'
        },
        {
          value: 'Option 2'
        },
        {
          value: 'Option 3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false,
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  },
  {
    type: 'time',
    icon: 'icon-time',
    options: {
      defaultValue: '21:19:56',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: '',
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true
    }
  },
  {
    type: 'date',
    icon: 'icon-date',
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      width: '',
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true
    }
  },
  {
    type: 'rate',
    icon: 'icon-pingfen1',
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false,
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  },
  {
    type: 'color',
    icon: 'icon-color',
    options: {
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false,
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  },
  {
    type: 'select',
    icon: 'icon-select',
    options: {
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      showLabel: true,
      width: '',
      options: [
        {
          value: 'Option 1'
        },
        {
          value: 'Option 2'
        },
        {
          value: 'Option 3'
        }
      ],
      remote: false,
      filterable: false,
      remoteOptions: [],
      requestMethod: {
        url: '',
        method: 'get',
        params: '{}',
        headers: '{}',
        result: 'data',
        timeout: 10
      },
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  },
  {
    type: 'switch',
    icon: 'icon-switch',
    options: {
      defaultValue: false,
      required: false,
      disabled: false,
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  },
  {
    type: 'slider',
    icon: 'icon-slider',
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: '',
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  },
  {
    type: 'text',
    icon: 'icon-wenzishezhi-',
    options: {
      font_size: '15px', // 字体大小
      font_color: '#606266', // 字体颜色
      font_weight: '500', // 粗体
      font_family: '', // 字体属性
      defaultValue: '这是一句话',
      labelWidthStatus: true,
      customClass: '',
      labelWidth: 100,
      labelWidthDisabled: false,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  }
]

export const advanceComponents = [
  {
    type: 'blank',
    icon: 'icon-zidingyishuju',
    options: {
      defaultType: 'String',
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  },
  {
    type: 'imgupload',
    icon: 'icon-tupian',
    options: {
      defaultValue: [],
      size: {
        width: 100,
        height: 100
      },
      width: '',
      tokenFunc: 'funcGetToken',
      token: '',
      domain: '',
      disabled: false,
      length: 8,
      multiple: false,
      isQiniu: false,
      isDelete: false,
      min: 0,
      isEdit: false,
      action: 'http://<your_domain>/api/v1/public/uploadFile',
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  },
  {
    type: 'file',
    icon: 'icon-wenjianshangchuan',
    options: {
      defaultValue: [],
      width: '',
      tokenFunc: 'funcGetToken',
      token: '',
      domain: '',
      disabled: false,
      length: 9,
      headers: {},
      isQiniu: false,
      tip: '', // 提示说明
      action: 'http://<your_domain>/api/v1/public/uploadFile',
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  },
  {
    type: 'editor',
    icon: 'icon-fuwenbenkuang',
    options: {
      defaultValue: '',
      width: '',
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  },
  {
    type: 'cascader',
    icon: 'icon-jilianxuanze',
    options: {
      defaultValue: [],
      width: '',
      placeholder: '',
      disabled: false,
      clearable: false,
      remote: false,
      remoteOptions: [],
      showAllLevels: true,
      options: [{
        value: 'opt_1',
        label: 'Option 1',
        children: [{
          value: 'sub_opt_1',
          label: 'Sub Option 1',
          children: [{
            value: 'mem_opt',
            label: 'Mem Option'
          }]
        },
        {
          value: 'opt_2',
          label: 'Option 2'
        }]
      }],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: '',
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  },
  {
    type: 'subform',
    icon: 'icon-table',
    columns: [{
      span: 12,
      list: []
    }, {
      span: 12,
      list: []
    }],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top',
      labelWidth: 100,
      labelWidthDisabled: false,
      labelWidthStatus: true,
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  }
]

export const layoutComponents = [
  {
    type: 'grid',
    icon: 'icon-grid-',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  },
  {
    type: 'divider',
    icon: 'icon-input',
    options: {
      defaultValue: '分割线', // 字体大小
      font_size: '15px', // 字体大小
      font_color: '#606266', // 字体颜色
      font_weight: '500', // 粗体
      font_family: '', // 字体属性
      direction: 'horizontal', // horizontal / vertical 设置分割线方向
      content_position: 'center', // left / right / center 设置分割线文案的位置
      displayVerify: {
        type: 'hide',
        list: [{
          model: '字段标识',
          value: '字段值'
        }]
      }
    }
  }
]
