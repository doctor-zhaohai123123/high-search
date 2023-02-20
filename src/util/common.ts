/**
 * 获取UUID
 */
import { WidgetTypeEnum } from './operator-enum'

export function getUUID(): string {
  return URL.createObjectURL(new Blob()).substr(-36)
}

/**
 * 判断是否是多选
 * @param type
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isMultiple(type: WidgetTypeEnum) {
  const multiple = [WidgetTypeEnum.CHECKBOX, WidgetTypeEnum.SELECT_MULTIPLE]
  return multiple.includes(type)
}

/**
 * 日期时间类型解析, 支持以下格式的解析
 * @example 2022-03-14 16:13:13
 * @example 1647532800000
 * @example "1647532800000"
 * @example "1647532800000,165098880000"
 * @example [1647532800000,165098880000]
 * @example ["1647532800000","165098880000"]
 * @example [Date,Date]
 */
export type DateValue = string | number | Date
export function resolveDateValue(value: DateValue | DateValue[]): Date | Date[] {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === 'string' && /^\d+$/g.test(item)) return new Date(Number(item))
      return new Date(item)
    })
  } else {
    if (typeof value === 'string' && /^\d+$/g.test(value)) return new Date(Number(value))
    if (typeof value === 'string' && value.indexOf(',') !== -1) {
      return resolveDateValue(value.split(','))
    }
    return new Date(value)
  }
}

/**
 * 获取时间日期
 */
export function getDatetime(date: Date): string {
  const y = date.getFullYear()
  const m = date.getMonth()
  const d = date.getDate()
  const h = date.getHours()
  const s = date.getSeconds()
  const min = date.getMinutes()

  const fix = (v: number) => (v < 10 ? '0' + v : v)

  return `${y}-${m}-${fix(d)} ${fix(h)}:${fix(s)}:${fix(min)}`
}
