
## 使用文档

### 方法：useConditionFilters

> 用于获取_ConditionGroupContainer_、_HighSearch_组件的值


```typescript
function handlerClickButton(id?: number) {
  const filters = useConditionFilters(id)
  const model = filters.getSearchValue()
  console.log(model)
}
```

### 组件: WidgetRender

```vue
<WidgetRender :type="WidgetTypeEnum.STRING" :display="DisplayModelEnum.SIMPLE" />
```

> 在根据类型显示对应的组件的时候可以用这个组件来加载其他组件


### 组件：ConditionGroupContainer

> 该组件适用于，复杂场景、多条件组合搜索的情况下
例如：
1、会员中心的动态标签


#### 属性

```typescript
const Props = {
  id: { // 指定一个唯一ID，当页面有多个组件时，该参数为必须
    type: [String, Number] as PropType<string | number>
  },
  fields: { // 字段配置
    type: Array as PropType<Field[]>
  },
  data: { // 默认值
    type: Object as PropType<OriginData>
  },
  widgets: { // 本地自定义的widget 可覆盖内置的
    type: Array as PropType<WidgetManagerInit[]>,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    default: () => [],
    required: false
  },
  width: {
    type: String,
    default: 'fit-content'
  },
  renderTitleText: {
    type: Function as PropType<RenderTitle>,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    default: (index: number) => `条件组${index + 1}`
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'small'
  },
  disabled: { // 是否禁用整个组件
    type: Boolean,
    default: false
  }
```

#### example

```vue
<ConditionGroupContainer :id="222" :fields="labelFilds" :widgets="widgets" :data="data" />

<script setup lang='ts'>
import {
  DisplayModelEnum,
  OperationEnum,
  Model,
} from '@doctorhai/high-search'

const labelFilds = [{
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
}]

const data = {
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
  ]
}

const highSearchData: Model[] = [
  // { key: 'strnum', value: 100, operator: OperationEnum.EQ, display: DisplayModelEnum.SIMPLE },
  { key: 'test-checkbox', value: 'v1,v2', operator: OperationEnum.EQ, display: DisplayModelEnum.SIMPLE },
  { key: 'SelectMultiple', value: 'v1,v2', operator: OperationEnum.EQ, display: DisplayModelEnum.SIMPLE },
  { key: 'birth', value: [1647532800000, 1650988800000], operator: OperationEnum.BE, display: DisplayModelEnum.RANGE },
  {
    key: 'DateTime',
    value: '1647532800000,1650988800000',
    operator: OperationEnum.BE,
    display: DisplayModelEnum.RANGE
  },
  { key: 'strnum', value: '0', operator: OperationEnum.EQ, display: DisplayModelEnum.SIMPLE }
]
</script>
```

### 组件：HighSearch

> 相比 _ConditionGroupContainer_ 组件改组件更加的轻量级，适用于一些简单的多条件的场景


#### 属性

```typescript
const Props = {
  id: { // 指定一个唯一ID，当页面有多个组件时，该参数为必须
    type: [String, Number] as PropType<string | number>
  },
  fields: { // 字段配置
    type: Array as PropType<Field[]>
  },
  data: { // data默认值
    type: Array as PropType<Model[]>,
    default: () => []
  },
  labelWidth: {
    type: String,
    default: '90px'
  },
  showField: {
    type: Boolean,
    default: false
  },
  showClose: {
    type: Boolean,
    default: false
  },
  widgets: { // 本地自定义的widget 可覆盖内置的
    type: Array as PropType<WidgetManagerInit[]>,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    default: () => [],
    required: false
  },
  width: {
    type: String,
    default: 'fit-content'
  },
  renderTitleText: {
    type: Function as PropType<RenderTitle>,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    default: (index: number) => `条件组${index + 1}`
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'small'
  },
  disabled: { // 是否禁用整个组件
    type: Boolean,
    default: false
  }
```

#### example

```vue
<HighSearch :fields="fields" :data="highSearchData" :id="111" :disabled="false" />

<script setup lang='ts'>
import {
  DisplayModelEnum,
  OperationEnum,
  Model,
} from '@doctorhai/high-search'

const fields = [
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
    type: 'Radio', //Date|String|Number|Select
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
  }
]

const highSearchData: Model[] = [
  // { key: 'strnum', value: 100, operator: OperationEnum.EQ, display: DisplayModelEnum.SIMPLE },
  { key: 'test-checkbox', value: 'v1,v2', operator: OperationEnum.EQ, display: DisplayModelEnum.SIMPLE },
  { key: 'SelectMultiple', value: 'v1,v2', operator: OperationEnum.EQ, display: DisplayModelEnum.SIMPLE },
  { key: 'birth', value: [1647532800000, 1650988800000], operator: OperationEnum.BE, display: DisplayModelEnum.RANGE },
  {
    key: 'DateTime',
    value: '1647532800000,1650988800000',
    operator: OperationEnum.BE,
    display: DisplayModelEnum.RANGE
  },
  { key: 'strnum', value: '0', operator: OperationEnum.EQ, display: DisplayModelEnum.SIMPLE }
]
</script>
```
## 
## 设计思路

主要从下面三个维度

组件：组件的拆分，props

插件：用于扩展组件的一些功能

数据结构：定义返回、请求的数据结构体

### 组件

#### ConditionItem

每一项搜索条件，由关联关系、筛选字段、筛选条件、筛选条件值组成

##### Props
| 名称 | 类型 | 说明 |
| --- | --- | --- |
| connect | ConnectEnum | 每一个搜索项的关系，1=并且，2=或者 |
| fields | Field[] | 可参与搜索的字段 |
| operator | Operator[] | 操作符，搜索条件匹配方式 |
| values | String[] &#124; Number[] | 搜索的条件值 |
| defaultValue | Object {connect, field, operator, values} | 默认值 |


###### Field

- 除了下列定义的意外应该支持对应组件的所有原生属性
| 名称 | 类型 | 说明 |
| --- | --- | --- |
| name | String | 字段名称 |
| key | OperationEnum | 字段Key |
| type | String | 字段类型 String、Number、Date、Select |
| options | Array | 下拉选项 |
| disabled | Boolean | 是否禁用 |


###### Operator
| 名称 | 类型 | 说明 |
| --- | --- | --- |
| name | String | 字段名称 |
| value | OperationEnum | 操作符的值 |
| disabled | Boolean | 是否禁用 |


```typescript
enum OperationEnum {
  EQ = 1, // 等于 
  NE = 2, // 不等于 
  GT = 3, // 大于　 
  LT = 4, // 小于 
  GE = 5, // 大于等于 
  LE = 6, // 小于等于
  IN = 7, // 包含
  NI = 8, // 不包含
  BE = 9, // 介于
}

enum ConnectEnum {
  AND = 1, // 并且
  OR = 2  // 或者
}
```

#### ConditionItemValue

条件值输入组件，接收筛选条件的值作为参数，根据不同的值显示不同的输入组件

该组件应该包含一个widget库，

##### Props
| 名称 | 类型 | 说明 |
| --- | --- | --- |
| fieldType | String | 决定显示普通数据框还是下拉输入框还是时间日期输入组件， |
| operation | Number &#124; String | 决定单独显示还是组合显示 |
| value | String &#124; Number &#124; Array | 默认值 |


#### ConditionItemGroup

条件组，由多个`ConditionItem`组件组合成

##### Data
| 名称 | 类型 | 说明 |
| --- | --- | --- |
| conditions | Array | 管理当前分组下的所有条件组合，ConditionItem 组件的props |
| connect | ConnectEnum | 管理当前组合每一个条件的关联关系 |


##### Props
| 名称 | 类型 | 说明 |
| --- | --- | --- |
| conditions | Array | 当前分组下的所有条件组 |


#### ConditionGroupContainer

最外层结构组件，由多个`ConditionGroup`组件组合成


#### ConditionGroupManager

- 管理所有的widget
- 从外部注入的widget也会被注入到这个manger里面

```typescript
enum WidgetType {
  LOCAL,     // 本地的
  COMPONENT, // 组件级别的
  GLOBAL,    // 全局的
}

interface WidgetManagerInit {
  widget: Component
  fieldType: string
  operator: OperatorEnum | number | string
  widgetType: WidgetType
}

abstract class ConditionGroupManager {

  static getManager(id: number): ConditionGroupManager

  static createManager(): ConditionGroupManager

  // 全局的widght
  static globalWidght: WidgetManagerInit[]

  // 当前Manager的ID 自动生成或者组件参数传入
  id: number

  // 是否处于激活状态
  isActive: boolean

  // 存储当前组件可用的widget
  widgets: WidgetManagerInit[]

  // 初始化所有的 widget
  initWidght(arr: WidgetManagerInit[]): void

  // 根据operator和fieldType以及 widgetType 属性优先级获取输入组件
  getWiget(fieldType: string): Component

  // 外部注册进来的 widght 需要检查和现有的operator是否冲突
  registry(item: WidgetManagerInit) {}
}
```

### 插件

#### ConditionItemValue

注入widget组件，用于在指定的操作符显示指定的输入组件

###### 全局注入widget

函数：`registryGlobalWidget(component, operator, fieldType)`

参数：

- component {Component} 显示的组件
- operator {Number | String} 在指定操作符时候显示
- fieldType {String} 在指定的操作符、fieldType时候显示

Widget Props

- value {String | Array}  组件的默认值, 在组件内部调用 `emit('change', val)` 事件向父组件设置当前的值
- operator {Number | String}
- fieldType {String}

###### 局部注入widget

函数：`registryCurrentScopelWidget(component, operator, fieldType)`

参数：

- component {Component} 显示的组件
- operator {Number | String} 在指定操作符时候显示
- fieldType {String} 在指定的操作符、fieldType时候显示

Widget Props

- value {String | Array}  组件的默认值, 在组件内部调用 `emit('change', val)` 事件向父组件设置当前的值
- operator {Number | String}
- fieldType {String}

### 数据结构

#### 配置返回结构体

- 每一个对应的字段返回如下配置
- Example _(下面为一些必须的字段信息、可能会另外包含其他特定场景字段信息)_

```json
[
  {
    "rule": [
      {
        "label": "等于",
        "value": "EQ"
      },
      {
        "label": "不等于",
        "value": "NOT_EQ"
      }
    ],
    "name": "昵称",
    "key": "nickname",
    "type": "Date|String|Number|Select",
    "multiple": true,
    "group": true,
    "options": [
      {
        "label": "1",
        "value": "1"
      },
      {
        "label": "2",
        "value": "2"
      }
    ]
  }
]
```

#### 请求结构体

- Example _(POST)_
- _value字段多值情况下传递数组_

```json
{
  "operate": "and",
  "group": [
    {
      "operate": "and",
      "filters": {
        "mobile": {
          "rule": "EQ",
          "value": "1520"
        },
        "sex": {
          "rule": "EQ",
          "value": "123"
        }
      }
    }
  ]
}
```
