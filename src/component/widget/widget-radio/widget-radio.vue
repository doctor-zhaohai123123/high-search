<template>
  <el-radio-group v-bind="componentProps">
    <el-radio v-for="item in options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
  </el-radio-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Option } from '@/model'
export default defineComponent({
  name: 'widget-radio',
  props: {
    options: {
      type: Array as PropType<Option[]>,
      default: () => []
    },
    componentProps: {
      type: Object,
      default: () => ({})
    }
  }
})
</script>
