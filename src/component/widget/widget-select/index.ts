import WidgetSelect from './widget-select.vue'
import WidgetSelectMultiple from './widget-select-multiple.vue'
import { provideWidget } from '@/util/provide-widget'
import { DisplayModelEnum, WidgetTypeEnum } from '@/util/operator-enum'

provideWidget({
  type: WidgetTypeEnum.SELECT,
  widgets: [
    {
      widget: WidgetSelect,
      display: [DisplayModelEnum.SIMPLE]
    }
  ]
})

provideWidget({
  type: WidgetTypeEnum.SELECT_MULTIPLE,
  widgets: [
    {
      widget: WidgetSelectMultiple,
      display: [DisplayModelEnum.SIMPLE]
    }
  ]
})
