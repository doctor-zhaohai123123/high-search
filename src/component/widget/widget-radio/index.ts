import WidgetRadio from './widget-radio.vue'
import { provideWidget } from '@/util/provide-widget'
import { DisplayModelEnum, WidgetTypeEnum } from '@/util/operator-enum'

provideWidget({
  type: WidgetTypeEnum.RADIO,
  widgets: [
    {
      widget: WidgetRadio,
      display: [DisplayModelEnum.SIMPLE]
    }
  ]
})
