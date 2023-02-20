import WidgetInput from './widget-input.vue'
import { DisplayModelEnum, WidgetTypeEnum } from '@/util/operator-enum'
import { provideWidget } from '@/util/provide-widget'

provideWidget({
  type: WidgetTypeEnum.STRING,
  widgets: [
    {
      widget: WidgetInput,
      display: [DisplayModelEnum.SIMPLE]
    }
  ]
})
