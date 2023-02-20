import WidgetDate from './widget-date.vue'
import WidgetDateGroup from './widget-date-group.vue'

import WidgetTimePicker from './widget-time-picker.vue'
import WidgetTimePickerGroup from './widget-time-picker-group.vue'

import WidgetDateTimePicker from './widget-date-time-picker.vue'
import WidgetDateTimePickerGroup from './widget-date-time-picker-group.vue'

import { provideWidget } from '@/util/provide-widget'
import { DisplayModelEnum, WidgetTypeEnum } from '@/util/operator-enum'

provideWidget({
  type: WidgetTypeEnum.DATE,
  widgets: [
    {
      widget: WidgetDate,
      display: [DisplayModelEnum.SIMPLE]
    },
    {
      widget: WidgetDateGroup,
      display: [DisplayModelEnum.RANGE]
    }
  ]
})

provideWidget({
  type: WidgetTypeEnum.TIME,
  widgets: [
    {
      widget: WidgetTimePicker,
      display: [DisplayModelEnum.SIMPLE]
    },
    {
      widget: WidgetTimePickerGroup,
      display: [DisplayModelEnum.RANGE]
    }
  ]
})

provideWidget({
  type: WidgetTypeEnum.DATE_TIME,
  widgets: [
    {
      widget: WidgetDateTimePicker,
      display: [DisplayModelEnum.SIMPLE]
    },
    {
      widget: WidgetDateTimePickerGroup,
      display: [DisplayModelEnum.RANGE]
    }
  ]
})
