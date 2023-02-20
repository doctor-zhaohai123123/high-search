import { Field, Obj, OriginData } from '../model'
import { ConnectEnum } from './operator-enum'

interface ResponseParameterGroupField extends Obj {
  value: never
  rule: string
}

interface ResponseParameterGroup {
  operate: ConnectEnum
  filters: {
    [key: string]: ResponseParameterGroupField
  }
}

/**
 * 组件对外返回的结构体
 */
export interface ParameterResponse {
  operate: ConnectEnum
  group: ResponseParameterGroup[]
}

/**
 * 默认的参数解析器
 */
export function defaultResolver(fields: Field[], values: OriginData): ParameterResponse {
  console.log(fields, values)
  return { group: [], operate: ConnectEnum.AND }
}
