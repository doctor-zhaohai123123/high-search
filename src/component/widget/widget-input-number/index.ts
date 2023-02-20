import { provideWidget } from '@/util/provide-widget'
import { DisplayModelEnum, WidgetTypeEnum } from '@/util/operator-enum'
import WidgetInputNumber from './widget-input-number.vue'
import WidgetInputNumberGroup from './widget-input-number-group.vue'

import WidgetInputFloat from './widget-input-float.vue'
import WidgetInputFloatGroup from './widget-input-float-group.vue'

/**
 * 整型
 */
provideWidget({
  type: WidgetTypeEnum.NUMBER,
  widgets: [
    {
      display: [DisplayModelEnum.SIMPLE],
      widget: WidgetInputNumber
    },
    {
      display: [DisplayModelEnum.RANGE],
      widget: WidgetInputNumberGroup
    }
  ]
})

/**
 * 浮点
 */
provideWidget({
  type: WidgetTypeEnum.FLOAT,
  widgets: [
    {
      display: [DisplayModelEnum.SIMPLE],
      widget: WidgetInputFloat
    },
    {
      display: [DisplayModelEnum.RANGE],
      widget: WidgetInputFloatGroup
    }
  ]
})
