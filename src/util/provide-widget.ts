import { ConditionManager, WidgetManagerInit } from '@/core/condition-group-manager'

/**
 * 添加本地widget
 * @param o
 */
export function provideWidget(o: WidgetManagerInit): void {
  ConditionManager.localWidget.push(o)
}

/**
 * 注册全局widget
 * @param o
 */
export function registryGlobalWidget(o: WidgetManagerInit | WidgetManagerInit[]): void {
  if (Array.isArray(o)) {
    ConditionManager.globalWidget.push(...o)
  } else {
    ConditionManager.globalWidget.push(o)
  }
}

/**
 * 注册局部widget TODO 异步注册的组件如何触发更新？？？
 * @param id
 * @param o
 */
export function registryCurrentScopeWidget(id: number | string, o: WidgetManagerInit | WidgetManagerInit[]): void {
  const manager = ConditionManager.getManagerById(id)
  if (Array.isArray(o)) {
    o.forEach((f) => manager.addScopeWidget(f))
  } else {
    manager.addScopeWidget(o)
  }
}
