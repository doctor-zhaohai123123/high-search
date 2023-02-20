import { WidgetTypeEnum, ConnectEnum, DisplayModelEnum } from '../util/operator-enum'
import { Obj } from '../model/type'

export interface Option {
  label: string
  /* eslint-disable */
  value?: any
  options?: Option[]

  children?: Option[]
}

/**
 * Field的条件字段信息
 */
export interface FieldRule extends Option {
  /**
   * 判断显示单个控件、或者范围控件、或者不显示
   */
  display: DisplayModelEnum
}

/**
 * 字段
 */
export interface Field {
  /**
   * 字段名称
   */
  name: string

  /**
   * 字段key
   */
  key: string

  /**
   * 字段类型
   */
  type: WidgetTypeEnum

  /**
   * 规则
   */
  rule: FieldRule[]

  /**
   * 是否多选
   */
  multiple?: boolean

  /**
   *  Select 选项
   */
  options?: Option[]

  /**
   * 组件默认支持的配置
   */
  componentProps?: Obj

  /**
   * Select组件 分组
   */
  group?: boolean

  /**
   * 分组名称
   */
  label?: string

  /**
   * 分组选项
   */
  groupOptions?: Field[]

}

/**
 * model
 */
export interface Model {
  id?: number
  /**
   * 字段key
   */
  key: string | number

  /**
   * 字段值
   */
  value: string | number | number[] | string[] | any

  /**
   * 规则
   */
  operator: string | number

  /**
   * 对应的字段信息
   */
  field?: Field

  display: DisplayModelEnum
}

/**
 * group
 */
export interface Group {
  id?: number
  /**
   * 操作符
   */
  operate: ConnectEnum
  filters: Model[]
}

/**
 * 回显数据
 */
export interface OriginData {
  id?: number
  operate: ConnectEnum | number
  group: Group[]
}
