<template>
  <div class="widget-input-number-group">
    <el-input-number
      :max="endVal"
      controls-position="right"
      v-model="startVal"
      v-bind="bindProps"
      placeholder="最小值"
    />
    <span class="separator">-</span>
    <el-input-number
      :min="startVal"
      controls-position="right"
      v-model="endVal"
      v-bind="bindProps"
      placeholder="最大值"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType, computed } from 'vue'
export default defineComponent({
  name: 'widget-input-float-group',
  props: {
    modelValue: {
      type: String as PropType<string>,
      required: false
    },
    componentProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const startVal = ref<number | undefined>()
    const endVal = ref<number | undefined>()

    const bindProps = computed(() => ({
      ...props.componentProps,
      ...context.attrs,
      'onUpdate:modelValue': onChangeInput
    }))

    watch(
      () => props.modelValue,
      () => {
        if (props.modelValue) {
          const split = props.modelValue.split(',')
          startVal.value = Number(split[0])
          endVal.value = Number(split[1])
        } else {
          startVal.value = undefined
          endVal.value = undefined
        }
      },
      { immediate: true }
    )

    function onChangeInput() {
      const start = startVal.value || 0
      const end = endVal.value || 0
      context.emit('update:modelValue', [start, end].join(','))
    }

    return {
      startVal,
      endVal,
      bindProps
    }
  }
})
</script>

<style lang="scss" scoped>
.widget-input-number-group {
  display: flex;
}
</style>
