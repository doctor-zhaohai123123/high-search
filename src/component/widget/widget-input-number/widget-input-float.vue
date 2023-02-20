<template>
  <el-input-number v-model="value" controls-position="right" v-bind="componentProps" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { isNumber } from './util'
export default defineComponent({
  name: 'widget-input-float',
  props: {
    componentProps: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: [String, Number]
    }
  },
  setup(props, ctx) {
    const value = computed({
      /*eslint-disable*/
      get(): any {
        if (isNumber(props.modelValue)) return Number(props.modelValue)
        return props.modelValue
      },
      set(v: number) {
        ctx.emit('update:modelValue', v)
      }
    })

    return {
      value
    }
  }
})
</script>
