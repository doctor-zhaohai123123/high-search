/**
 * 定义一个任意类型的对象
 */
import { ConnectEnum } from '../util/operator-enum'
import { Field, Group, Model, OriginData } from './field'
/* eslint-disable */
export interface Obj<V = any> {
  [k: string]: V
}

/**
 * ConditionGroup的返回值
 */
export interface ConditionGroupValue {
  operator: ConnectEnum
  values: Model[]
}

/**
 * ConditionContainer组件对外暴露(expose)的方法
 */
export interface ConditionContainerInstance {
  /**
   * 获取组件的原始数据
   */
  getOriginData(): OriginData | Model[]

  /**
   * 获取managerID
   */
  getManagerId(): unknown

  /**
   * 获取Fields
   */
  getFields(): Field[]
}

export type ComponentSize = 'small' | 'mini' | 'medium' | 'default' | 'large'

export type RenderTitle = (index: number) => string

export interface SubmitHook {
  getModel: () => Obj
}

export interface ContainerGroup {
  group?: Group
  uuid: string
}
