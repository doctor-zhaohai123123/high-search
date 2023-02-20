<template>
  <el-cascader clearable v-bind="componentProps" :options="options" />
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Option } from '@/model'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'widget-cascader',
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
  }
})
</script>
