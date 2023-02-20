<template>
  <el-date-picker placeholder="请选择" v-bind="componentProps" :model-value="value" @update:modelValue="change" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { resolveDateValue } from '@/util/common'

export default defineComponent({
  name: 'widget-date',
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
    function change(v: string | number | Date) {
      ctx.emit('update:modelValue', v)
    }
    return {
      value,
      change
    }
  }
})
</script>
