import { WidgetTypeEnum } from './operator-enum'

/**
 * 获取placeholder
 *
 * @param type fieldType
 */
export function getPlaceholder(type: WidgetTypeEnum): string {
  const select = [WidgetTypeEnum.SELECT, WidgetTypeEnum.DATE, WidgetTypeEnum.TIME]
  if (select.includes(type)) return '请选择'
  return '请输入'
}
