import WidgetCheckbox from './widget-checkbox.vue'
import { provideWidget } from '@/util/provide-widget'
import { DisplayModelEnum, WidgetTypeEnum } from '@/util/operator-enum'

provideWidget({
  type: WidgetTypeEnum.CHECKBOX,
  widgets: [
    {
      widget: WidgetCheckbox,
      display: [DisplayModelEnum.SIMPLE]
    }
  ]
})
