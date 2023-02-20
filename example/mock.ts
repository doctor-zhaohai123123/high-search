import { DisplayModelEnum, OperationEnum } from '../src'

export const fields = [
  {
    name: '数字',
    key: 'strnum',
    type: 'Number',
    componentProps: {
      type: 'number',
      suffixText: '件'
    },
    rule: [
      {
        label: '等于',
        value: OperationEnum.EQ,
        display: DisplayModelEnum.SIMPLE
      },
      {
        label: '大于',
        value: OperationEnum.LE,
        display: DisplayModelEnum.SIMPLE
      },
      {
        label: '介于',
        value: OperationEnum.BE,
        display: DisplayModelEnum.RANGE
      }
    ]
  },
  {
    name: '单选',
    key: 'test-radio',
    type: 'Select', //Date|String|Number|Select
    rule: [
      {
        label: '等于',
        value: OperationEnum.EQ,
        display: DisplayModelEnum.SIMPLE
      },
      {
        label: '包含',
        value: OperationEnum.IN,
        display: DisplayModelEnum.SIMPLE
      }
    ],
    options: [
      {
        label: '选项1',
        value: 'v1'
      },
      {
        label: '选项2',
        value: 'v2'
      }
    ]
  },
  {
    name: '下拉多选',
    key: 'SelectMultiple',
    type: 'SelectMultiple',
    rule: [
      {
        label: '等于',
        value: OperationEnum.EQ,
        display: DisplayModelEnum.SIMPLE
      },
      {
        label: '不等于',
        value: OperationEnum.NE,
        display: DisplayModelEnum.SIMPLE
      }
    ],
    options: [
      {
        label: '选项1',
        value: 'v1'
      },
      {
        label: '选项2',
        value: 'v2'
      }
    ]
  },
  {
    name: '多选',
    key: 'test-checkbox',
    type: 'Checkbox', //Date|String|Number|Select
    rule: [
      {
        label: '等于',
        value: OperationEnum.EQ,
        display: DisplayModelEnum.SIMPLE
      },
      {
        label: '不等于',
        value: OperationEnum.NE,
        display: DisplayModelEnum.SIMPLE
      }
    ],
    options: [
      {
        label: '选项1',
        value: 'v1'
      },
      {
        label: '选项2',
        value: 'v2'
      }
    ]
  },
  {
    name: '文本',
    key: 'nickname',
    type: 'String', //Date|String|Number|Select
    rule: [
      {
        label: '等于',
        value: OperationEnum.EQ,
        display: DisplayModelEnum.SIMPLE
      },
      {
        label: '不等于',
        value: OperationEnum.NE,
        display: DisplayModelEnum.SIMPLE
      }
    ]
  },
  {
    name: '日期',
    key: 'birth',
    type: 'Date', //Date|String|Number|Select
    rule: [
      {
        label: '等于',
        value: OperationEnum.EQ,
        display: DisplayModelEnum.SIMPLE
      },
      {
        label: '介于',
        value: OperationEnum.BE,
        display: DisplayModelEnum.RANGE
      }
    ]
  },
  {
    name: '时间',
    key: 'Time',
    type: 'Time',
    rule: [
      {
        label: '等于',
        value: OperationEnum.EQ,
        display: DisplayModelEnum.SIMPLE
      },
      {
        label: '介于',
        value: OperationEnum.BE,
        display: DisplayModelEnum.RANGE
      }
    ]
  },
  {
    name: '日期时间',
    key: 'DateTime',
    type: 'DateTime',
    rule: [
      {
        label: '等于',
        value: OperationEnum.EQ,
        display: DisplayModelEnum.SIMPLE
      },
      {
        label: '介于',
        value: OperationEnum.BE,
        display: DisplayModelEnum.RANGE
      }
    ]
  },
  {
    name: '树',
    key: 'tree',
    type: 'Tree',
    rule: [
      {
        label: '等于',
        value: OperationEnum.EQ,
        display: DisplayModelEnum.SIMPLE
      }
    ],
    options: [{ label: '上海市', value: '1', children: [{ label: '徐汇区', value: '1-1' }] }]
  },
  {
    name: '下拉选择',
    key: 'source',
    type: 'Select', //Date|String|Number|Select
    componentProps: {
      multiple: true
    },
    rule: [
      {
        label: '包含',
        value: OperationEnum.IN,
        display: DisplayModelEnum.SIMPLE
      },
      {
        label: '不包含',
        value: OperationEnum.NI,
        display: DisplayModelEnum.SIMPLE
      }
    ],
    options: [
      {
        label: '电商',
        options: [
          {
            label: '京东',
            value: '1'
          },
          {
            label: '淘宝',
            value: '2'
          }
        ]
      },
      {
        label: '家具',
        options: [
          {
            label: '沙发',
            value: 'sf'
          }
        ]
      }
    ]
  }
]

export const labelFilds = [
  {
    label: '赵海',
    groupOptions: [
      {
        name: '整型',
        key: 'int',
        type: 'Number',
        componentProps: {
          type: 'number',
          suffixText: '件'
        },
        rule: [
          {
            label: '等于',
            value: 'eq',
            display: DisplayModelEnum.SIMPLE
          },
          {
            label: '大于',
            value: OperationEnum.LE,
            display: DisplayModelEnum.SIMPLE
          },
          {
            label: '介于',
            value: OperationEnum.BE,
            display: DisplayModelEnum.RANGE
          }
        ]
      },
      {
        name: '浮点',
        key: 'float',
        type: 'Float',
        componentProps: {
          type: 'number',
          suffixText: '件'
        },
        rule: [
          {
            label: '等于',
            value: 'eq',
            display: DisplayModelEnum.SIMPLE
          },
          {
            label: '大于',
            value: OperationEnum.LE,
            display: DisplayModelEnum.SIMPLE
          },
          {
            label: '介于',
            value: OperationEnum.BE,
            display: DisplayModelEnum.RANGE
          }
        ]
      },
      {
        name: '单选',
        key: 'test-radio',
        type: 'Radio', //Date|String|Number|Select
        rule: [
          {
            label: '等于',
            value: OperationEnum.EQ,
            display: DisplayModelEnum.SIMPLE
          }
        ],
        options: [
          {
            label: '选项1',
            value: 'v1'
          },
          {
            label: '选项2',
            value: 'v2'
          }
        ]
      },
      {
        name: '多选',
        key: 'test-checkbox',
        type: 'Checkbox', //Date|String|Number|Select
        rule: [
          {
            label: '等于',
            value: OperationEnum.EQ,
            display: DisplayModelEnum.SIMPLE
          },
          {
            label: '不等于',
            value: OperationEnum.NE,
            display: DisplayModelEnum.SIMPLE
          }
        ],
        options: [
          {
            label: '选项1',
            value: 'v1'
          },
          {
            label: '选项2',
            value: 'v2'
          }
        ]
      },
      {
        name: '文本',
        key: 'nickname',
        type: 'String', //Date|String|Number|Select
        rule: [
          {
            label: '等于',
            value: OperationEnum.EQ,
            display: DisplayModelEnum.SIMPLE
          },
          {
            label: '不等于',
            value: OperationEnum.NE,
            display: DisplayModelEnum.SIMPLE
          }
        ]
      },
      {
        name: '测试为空不为空',
        key: 'isnull',
        rule: [
          {
            label: '为空',
            value: OperationEnum.EMPTY,
            display: DisplayModelEnum.NONE
          },
          {
            label: '不为空',
            value: OperationEnum.NO_EMPTY,
            display: DisplayModelEnum.SIMPLE
          }
        ]
      }
    ]
  },
  {
    label: '田启',
    groupOptions: [
      {
        name: '日期',
        key: 'birth',
        type: 'Date', //Date|String|Number|Select
        componentProps: {
          valueFormat: 'x'
        },
        rule: [
          {
            label: '等于',
            value: OperationEnum.EQ,
            display: DisplayModelEnum.SIMPLE
          },
          {
            label: '介于',
            value: OperationEnum.BE,
            display: DisplayModelEnum.RANGE
          }
        ]
      },
      {
        name: '时间',
        key: 'Time',
        type: 'Time',
        componentProps: {
          format: 'x'
        },
        rule: [
          {
            label: '等于',
            value: OperationEnum.EQ,
            display: DisplayModelEnum.SIMPLE
          },
          {
            label: '介于',
            value: OperationEnum.BE,
            display: DisplayModelEnum.RANGE
          }
        ]
      },
      {
        name: '日期时间',
        key: 'DateTime',
        type: 'DateTime',
        rule: [
          {
            label: '等于',
            value: OperationEnum.EQ,
            display: DisplayModelEnum.SIMPLE
          },
          {
            label: '介于',
            value: OperationEnum.BE,
            display: DisplayModelEnum.RANGE
          }
        ]
      },
      {
        name: '树',
        key: 'tree',
        type: 'Tree',
        rule: [
          {
            label: '等于',
            value: OperationEnum.EQ,
            display: DisplayModelEnum.SIMPLE
          }
        ],
        options: [{ label: '上海市', value: '1', children: [{ label: '徐汇区', value: '1-1' }] }]
      },
      {
        name: '下拉选择',
        key: 'source',
        type: 'Select', //Date|String|Number|Select
        componentProps: {
          multiple: true
        },
        rule: [
          {
            label: '包含',
            value: OperationEnum.IN,
            display: DisplayModelEnum.SIMPLE
          },
          {
            label: '不包含',
            value: OperationEnum.NI,
            display: DisplayModelEnum.SIMPLE
          }
        ],
        options: [
          {
            label: '电商',
            options: [
              {
                label: '京东',
                value: '1'
              },
              {
                label: '淘宝',
                value: '2'
              }
            ]
          },
          {
            label: '家具',
            options: [
              {
                label: '沙发',
                value: 'sf'
              }
            ]
          }
        ]
      }
    ]
  }
]

// 详情数据
export const remoteSource = {
  operate: 0,
  group: [
    {
      id: 1,
      operate: 1,
      filters: [
        {
          id: 2,
          key: 'nickname',
          value: ['海'],
          operator: 7,
          display: DisplayModelEnum.SIMPLE
        },
        {
          key: 'isnull',
          operator: OperationEnum.NI,
          display: DisplayModelEnum.NONE
        },
        {
          key: 'source',
          value: ['1', '2'],
          operator: OperationEnum.NI,
          display: DisplayModelEnum.SIMPLE
        },
        {
          key: 'test-radio',
          value: 'v1',
          operator: OperationEnum.EQ,
          display: DisplayModelEnum.SIMPLE
        },
        {
          key: 'test-checkbox',
          value: ['v1'],
          operator: OperationEnum.EQ,
          display: DisplayModelEnum.SIMPLE
        },
        {
          key: 'birth',
          value: [new Date(), new Date(Date.now() + 1000000 * 10000)],
          operator: OperationEnum.BE,
          display: DisplayModelEnum.RANGE
        },
        {
          key: 'birth',
          value: new Date(),
          operator: OperationEnum.EQ,
          display: DisplayModelEnum.SIMPLE
        }
      ]
    },
    {
      operate: 1,
      filters: [
        {
          key: 'nickname',
          value: '海',
          operator: 1,
          display: DisplayModelEnum.SIMPLE
        },
        {
          key: 'source',
          value: ['1'],
          operator: OperationEnum.IN,
          display: DisplayModelEnum.SIMPLE
        },
        {
          key: 'strnum',
          value: [1, 8],
          operator: OperationEnum.BE,
          display: DisplayModelEnum.RANGE
        }
      ]
    }
  ]
}
