import { Component, getCurrentInstance, onActivated, onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue'
import { DisplayModelEnum, WidgetTypeEnum } from '@/util/operator-enum'
import { ConditionContainerInstance } from '@/model'

export interface WidgetManagerInit {
  type: WidgetTypeEnum | string
  widgets: {
    widget: Component
    display: DisplayModelEnum[]
  }[]
}

export class ConditionManager {
  public static localWidget: WidgetManagerInit[] = []
  public static globalWidget: WidgetManagerInit[] = []

  private static readonly managers: ConditionManager[] = []

  /**
   * 创建manager
   * @param id
   */
  public static createManager(id?: unknown): ConditionManager {
    const instance = new ConditionManager()
    this.managers.push(instance)
    if (id !== undefined) {
      instance.id = id as number
    }
    onBeforeUnmount(() => {
      const idx = this.managers.findIndex((f) => f.id === instance.id)
      this.managers.splice(idx, 1)
    })
    return instance
  }

  /**
   * 获取当前激活的manager
   */
  public static getCurrentActiveManager(): ConditionManager {
    const f = this.managers.find((f) => f.isActive)
    if (!f) throw new Error('can not found active manager')
    return f
  }

  public static getManagerById(id: number | string): ConditionManager {
    const find = this.managers.find((f) => f.id === id)
    if (!find) {
      throw new Error(`[Manager] id ${id} is not found`)
    }
    return find
  }

  constructor() {
    this.id = URL.createObjectURL(new Blob()).substr(-36)
    this.scopeWidget = []
    onMounted(() => (this.isActive = true))
    onActivated(() => (this.isActive = true))
    onDeactivated(() => (this.isActive = false))
    const instance = getCurrentInstance()
    if (instance) {
      this.instance = instance.exposed as ConditionContainerInstance
    }
  }

  private isActive = true
  public id: string | number
  public scopeWidget: WidgetManagerInit[]
  public scopeWidgetCount = ref(0)
  public instance: ConditionContainerInstance

  public addScopeWidget(o: WidgetManagerInit): void {
    this.scopeWidget.push(o)
    this.scopeWidgetCount.value++
  }

  /**
   * 获取指定的widget
   * @param type
   * @param display
   */
  public getWidget(type: WidgetTypeEnum, display: DisplayModelEnum): Component | null {
    // 1、从本地组件注入的获取
    const scope = this.findWidget(type, display, this.scopeWidget)
    if (scope) return scope

    // 2、从全局注入的获取
    const global = this.findWidget(type, display, ConditionManager.globalWidget)
    if (global) return global

    // 3、从本地内置的获取
    const local = this.findWidget(type, display, ConditionManager.localWidget)
    if (local) return local

    console.warn(`[Widget Loader] type ${type} widget not found`)
    return null
  }

  private findWidget(type: WidgetTypeEnum, display: DisplayModelEnum, widgets: WidgetManagerInit[]) {
    const find = widgets.find((f) => f.type === type)
    if (find) {
      const widget = find.widgets.find((f) => f.display.includes(display))
      if (widget) return widget.widget
    }
    return null
  }
}
