import { InjectionKey } from 'vue'
import { ComponentSize, Field } from '@/model'
import { DateParamTransformType } from '@/model/param'

/**
 * manager
 */
export const CONDITION_GROUP_TOKENS: InjectionKey<number | string> = Symbol('CONDITION_GROUP_TOKENS')

/**
 * fields
 */
export const FIELDS_TOKENS: InjectionKey<Field[]> = Symbol('FIELDS_TOKENS')

/**
 * 组件的尺寸大小
 */
export const COMPONENT_SIZE: InjectionKey<ComponentSize> = Symbol('COMPONENT_SIZE')

/**
 * 指定输出的日期时间类型
 */
export const DATE_PARAM_TYPE: InjectionKey<DateParamTransformType> = Symbol('DATE_PARAM_TYPE')
