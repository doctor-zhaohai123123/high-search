<script lang="ts">
import { defineComponent, h, inject, PropType, ref, watch } from 'vue'
import { CONDITION_GROUP_TOKENS } from '@/util/tokens'
import { ConditionManager } from '@/core/condition-group-manager'
import { DisplayModelEnum, WidgetTypeEnum } from '@/util/operator-enum'
import { getPlaceholder } from '@/util/format-placeholder'
import { Option, Obj } from '@/model'
import { ConcreteComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'condition-item-value',
  props: {
    fieldType: {
      type: String as PropType<WidgetTypeEnum>,
      required: true
    },
    display: {
      type: Number as PropType<DisplayModelEnum>,
      required: true
    },
    defaultValue: {
      type: [String, Date, Number, Array] as PropType<unknown>
    },
    componentProps: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Array as PropType<Option[]>,
      default: () => undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:defaultValue'],
  setup(props, context) {
    const id = inject<number>(CONDITION_GROUP_TOKENS) as number
    const manager = ConditionManager.getManagerById(id)
    const modelValue = ref<unknown>()

    watch(
      props,
      (newProps, oldProps) => {
        if (newProps.defaultValue !== oldProps && newProps.defaultValue !== modelValue.value) {
          modelValue.value = props.defaultValue
        }
      },
      { immediate: true, deep: true }
    )

    function onUpdateModelValue(val: never) {
      modelValue.value = val
      context.emit('update:defaultValue', val)
    }

    return () => {
      const { options, componentProps } = props
      const WidgetComponent = manager.getWidget(props.fieldType, props.display as number)

      if (!WidgetComponent) return null

      const config: Obj = {
        options,
        size: 'small',
        placeholder: getPlaceholder(props.fieldType),
        modelValue: modelValue.value,
        'onUpdate:modelValue': onUpdateModelValue,
        disabled: props.disabled,
        componentProps
      }
      return h(WidgetComponent as ConcreteComponent, config)
    }
  }
})
</script>
