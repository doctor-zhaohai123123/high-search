<template>
  <el-select style="width: 200px" v-bind="componentProps" :model-value="value" multiple @update:modelValue="change">
    <template v-if="isGroup">
      <el-option-group v-for="item in options" :key="item.value" :label="item.label">
        <el-option v-for="opt in item.options || []" :key="opt.value" :value="opt.value" :label="opt.label" />
      </el-option-group>
    </template>
    <template v-else>
      <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
    </template>
  </el-select>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Option } from '@/model'
export default defineComponent({
  name: 'widget-multiple-select',
  props: {
    options: {
      type: Array as PropType<Option[]>,
      default: () => [],
      required: true
    },
    componentProps: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: [Array, String]
    }
  },
  setup(props, ctx) {
    const isGroup = computed(() => props.options.find((f) => Array.isArray(f.options)))
    const value = computed(() => {
      if (Array.isArray(props.modelValue) || !props.modelValue) return props.modelValue
      return props.modelValue?.split(',')
    })

    function change(v: unknown[]) {
      ctx.emit('update:modelValue', v.join(','))
    }

    return {
      value,
      isGroup,
      change
    }
  }
})
</script>
