import { provideWidget } from '@/util/provide-widget'
import { DisplayModelEnum, WidgetTypeEnum } from '@/util/operator-enum'
import WidgetCascader from './widget-cascader.vue'

provideWidget({
  type: WidgetTypeEnum.TREE,
  widgets: [
    {
      widget: WidgetCascader,
      display: [DisplayModelEnum.SIMPLE]
    }
  ]
})
