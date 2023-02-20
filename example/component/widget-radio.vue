<template>
  <el-radio-group model-value="v1">
    <el-radio v-for="item in options" :label="item.value" :key="item.value">{{ item.label }}</el-radio>
  </el-radio-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'widget-radio',
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    console.log('cover local widget')
  }
})
</script>
