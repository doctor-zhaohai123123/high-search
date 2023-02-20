<template>
  <el-date-picker
    placeholder="请选择"
    type="datetime"
    v-bind="componentProps"
    :model-value="value"
    @update:modelValue="change"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { DateValue, resolveDateValue } from '@/util/common'

export default defineComponent({
  name: 'widget-date-time-picker',
  props: {
    componentProps: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: [Date, Number, String]
    }
  },
  setup(props, ctx) {
    const value = computed(() => props.modelValue && resolveDateValue(props.modelValue))

    function change(v: DateValue) {
      ctx.emit('update:modelValue', v)
    }

    return {
      value,
      change
    }
  }
})
</script>
