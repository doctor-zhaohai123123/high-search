<template>
  <el-date-picker
    type="datetimerange"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    range-separator="-"
    v-bind="componentProps"
    :model-value="value"
    @update:modelValue="change"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { DateValue, resolveDateValue } from '@/util/common'

export default defineComponent({
  name: 'widget-date-time-picker-group',
  props: {
    componentProps: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: [Array] as PropType<DateValue[]>
    }
  },
  setup(props, ctx) {
    const value = computed(() => props.modelValue && resolveDateValue(props.modelValue))
    function change(v: DateValue[]) {
      ctx.emit('update:modelValue', v)
    }

    return {
      value,
      change
    }
  }
})
</script>
