<script lang="ts">
import { defineComponent, h, PropType } from 'vue'
import { ConditionManager } from '@/core/condition-group-manager'
import { DisplayModelEnum, WidgetTypeEnum } from '@/util/operator-enum'

export default defineComponent({
  name: 'widget-render',
  props: {
    type: {
      type: String as PropType<WidgetTypeEnum>,
      required: true
    },
    display: {
      type: Number as PropType<DisplayModelEnum>,
      required: true
    }
  },
  setup(props, ctx) {
    const manager = ConditionManager.createManager()
    const Component = manager.getWidget(props.type, props.display as DisplayModelEnum)
    if (!Component) {
      console.error('[widget render] not fount widget by type ' + props.type + ' and display ' + props.display)
      return ''
    }
    /* eslint-disable */
    return () => h(Component as any, ctx.attrs)
  }
})
</script>
