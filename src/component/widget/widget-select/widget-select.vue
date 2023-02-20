<template>
  <el-select style="width: 200px" v-bind="{ modelValue: undefined, ...componentProps }">
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
import { defineComponent, PropType } from 'vue'
import { Option } from '@/model'
export default defineComponent({
  name: 'widget-select',
  props: {
    options: {
      type: Array as PropType<Option[]>,
      default: () => [],
      required: true
    },
    componentProps: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isGroup() {
      return this.options.find((f) => Array.isArray(f.options))
    }
  }
})
</script>
