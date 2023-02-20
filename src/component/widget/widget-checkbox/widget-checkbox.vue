<template>
  <el-checkbox-group v-bind="componentProps" v-model="value" @change="change">
    <el-checkbox v-for="item in options" :key="item.value" :label="item.value">{{ item.label }}</el-checkbox>
  </el-checkbox-group>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { Option } from '@/model'

export default defineComponent({
  name: 'widget-checkbox',
  props: {
    options: {
      type: Array as PropType<Option[]>,
      default: () => []
    },
    componentProps: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: [Array, String] as PropType<string | string[]>,
      default: () => []
    }
  },
  setup(props, ctx) {
    const value = ref<string[]>([])
    watch(
      () => props.modelValue,
      () => {
        if (!props.modelValue) return
        if (Array.isArray(props.modelValue)) {
          value.value = props.modelValue
        } else {
          value.value = props.modelValue.split(',')
        }
      },
      {
        immediate: true,
        deep: true
      }
    )
    function change(v: unknown[]) {
      ctx.emit('update:modelValue', v.join(','))
    }
    return {
      value,
      change
    }
  }
})
</script>
