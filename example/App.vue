<template>
  <div style="padding: 20px">
    <el-tabs type="card" model-value="ConditionGroupContainer" layz>
      <!-- ConditionGroupContainer -->
      <el-tab-pane label="ConditionGroupContainer" name="ConditionGroupContainer">
        <el-alert title="复杂场景的多条件分组筛选组件" type="info" style="margin-bottom: 20px" />
        <el-button type="primary" @click="handlerClickButton(222)">打印数据</el-button>
        <ConditionGroupContainer :id="222" :fields="labelFilds" :widgets="widgets" :data="data" />
      </el-tab-pane>

      <!-- HighSearch -->
      <el-tab-pane label="HighSearch" name="HighSearch">
        <el-alert title="高级筛选组件、也可以用于简单的条件组合场景" type="info" style="margin-bottom: 20px" />
        <el-button type="primary" @click="handlerClickButton(111)">打印数据</el-button>
        <HighSearch :fields="fields" :widgets="widgets" :id="111" :disabled="false" />
      </el-tab-pane>

      <!-- WidgetRender -->
      <el-tab-pane label="WidgetRender" name="WidgetRender">
        <el-alert title="根据type显示不同的组件" type="info" style="margin-bottom: 20px" />
        <WidgetRender :type="WidgetTypeEnum.STRING" :display="DisplayModelEnum.SIMPLE" />
        <br />
        <br />
        <WidgetRender :type="WidgetTypeEnum.DATE" :display="DisplayModelEnum.SIMPLE" />
        <br />
        <br />
        <WidgetRender :type="WidgetTypeEnum.DATE" :display="DisplayModelEnum.RANGE" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import {
  ConditionGroupContainer,
  HighSearch,
  useConditionFilters,
  WidgetTypeEnum,
  WidgetRender,
  DisplayModelEnum,
  OperationEnum,
  Model,
  DateParamTransformType,
  DATE_PARAM_TYPE
} from '../src/index'
import { fields, labelFilds, remoteSource } from './mock'
import { onMounted, provide, ref } from 'vue'
import WidgetRadio from './component/widget-radio'

const data = ref({})

/**
 * 注册局部的widget
 */
const widgets = [
  {
    type: WidgetTypeEnum.RADIO,
    widgets: [
      {
        display: [1],
        widget: WidgetRadio
      }
    ]
  }
]
const highSearchData = ref<Model[]>([])
setTimeout(
  () =>
    (highSearchData.value = [
      // { key: 'strnum', value: 100, operator: OperationEnum.EQ, display: DisplayModelEnum.SIMPLE },
      { key: 'test-checkbox', value: 'v1,v2', operator: OperationEnum.EQ, display: DisplayModelEnum.SIMPLE },
      { key: 'SelectMultiple', value: 'v1,v2', operator: OperationEnum.EQ, display: DisplayModelEnum.SIMPLE },
      {
        key: 'birth',
        value: [1647532800000, 1650988800000],
        operator: OperationEnum.BE,
        display: DisplayModelEnum.RANGE
      },
      {
        key: 'DateTime',
        value: '1647532800000,1650988800000',
        operator: OperationEnum.BE,
        display: DisplayModelEnum.RANGE
      },
      { key: 'strnum', value: '0', operator: OperationEnum.EQ, display: DisplayModelEnum.SIMPLE }
    ])
)
provide(DATE_PARAM_TYPE, DateParamTransformType.SPLIT)

onMounted(() => {
  data.value = remoteSource
})

function handlerClickButton(id?: number) {
  const filters = useConditionFilters(id)
  const model = filters.getSearchValue()
  console.log(model)
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
