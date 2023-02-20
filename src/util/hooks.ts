import { ParameterResponse } from './parameter-resolver'
import { ConditionManager } from '../core/condition-group-manager'
import { Model } from '../model'
import { DateValue, getDatetime, resolveDateValue } from '../util/common'
import { inject } from 'vue'
import { DATE_PARAM_TYPE } from '@/util/tokens'
import { DateParamTransformType } from '@/model/param'

interface ConditionFiltersHook {
  getModel(): ParameterResponse

  getSearchValue(): Model[]
}

/**
 * hook函数
 *
 * @param id managerID
 */
export function useConditionFilters(id?: number): ConditionFiltersHook {
  const getManager = () => {
    if (id !== undefined) {
      return ConditionManager.getManagerById(id)
    }
    return ConditionManager.getCurrentActiveManager()
  }

  const toJson = (obj: unknown) => JSON.parse(JSON.stringify(obj))

  const getModel = () => {
    const instance = getManager().instance
    return toJson(instance.getOriginData()) as ParameterResponse
  }

  const getSearchValue = () => {
    return toJson(getManager().instance.getOriginData()) as Model[]
  }

  return {
    getSearchValue,
    getModel
  }
}

/**
 * a根据日期时间类型转换策略,返回指定格式的类型数据
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useDateParamTransform() {
  const type = inject(DATE_PARAM_TYPE)
  function transform(value: DateValue | DateValue[]) {
    value = resolveDateValue(value)
    if (type === DateParamTransformType.DATE) {
      if (Array.isArray(value)) return value.map((m) => new Date(m))
      return new Date(value)
    }

    if (type === DateParamTransformType.TIMESTAMP) {
      if (Array.isArray(value)) return value.map((m) => new Date(m).getTime())
      return new Date(value).getTime()
    }

    if (type === DateParamTransformType.STRING) {
      if (Array.isArray(value)) return value.map((m) => getDatetime(new Date(m)))
      return getDatetime(new Date(value))
    }

    if (type === DateParamTransformType.SPLIT) {
      if (Array.isArray(value)) return value.map((m) => new Date(m).getTime()).join(',')
      return new Date(value).getTime()
    }
    return value
  }

  return {
    transform
  }
}
