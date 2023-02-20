<template>
  <el-input v-bind="componentProps" />
  <el-input v-bind="componentProps" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'widget-input-group',
  props: {
    componentProps: {
      type: Object,
      default: () => ({})
    }
  }
})
</script>
