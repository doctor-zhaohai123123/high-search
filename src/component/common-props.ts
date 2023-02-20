import { PropType } from 'vue'
import { ComponentSize, Field, OriginData, RenderTitle } from '../model'
import { WidgetManagerInit } from '../core/condition-group-manager'

export const CommonProps = {
  id: {
    type: [String, Number] as PropType<string | number>
  },
  fields: {
    type: Array as PropType<Field[]>
  },
  data: {
    type: Object as PropType<OriginData>
  },
  widgets: {
    type: Array as PropType<WidgetManagerInit[]>,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    default: () => [],
    required: false
  },
  width: {
    type: String,
    default: 'fit-content'
  },
  renderTitleText: {
    type: Function as PropType<RenderTitle>,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    default: (index: number) => `条件组${index + 1}`
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'small'
  },
  disabled: {
    type: Boolean,
    default: false
  }
}
