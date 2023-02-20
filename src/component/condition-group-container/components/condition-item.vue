<template>
  <div class="condition-item">
    <el-icon v-if="showClose" class="close-icon" @click="$emit('on-delete')"><close-bold /></el-icon>
    <div class="condition-item-container">
      <!-- 连接符号 -->
      <el-select
        v-if="isShowConnect"
        v-model="localConnect"
        :size="size"
        :disabled="disabled"
        placeholder="请选择"
        class="mr-10 select_operate"
        @change="(val) => emits('change-connect', val)"
      >
        <el-option :value="item.value" :label="item.label" v-for="(item, index) in ConnectOptions" :key="index" />
      </el-select>
      <!-- 占位 -->
      <!--      <div v-else class="mr-10 select_operate" />-->

      <!-- 字段名称 -->
      <el-select
        v-if="showField"
        v-model="model.key"
        :size="size"
        :disabled="disabled"
        placeholder="请选择"
        class="mr-10 select_key"
        @change="handleKeyChange"
      >
        <template v-if="isGroup">
          <el-option-group v-for="(item, index) in fields" :key="index" :label="item.label">
            <el-option
              v-for="(opt, index) in item.groupOptions || []"
              :key="index"
              :value="opt.key"
              :label="opt.name"
            />
          </el-option-group>
        </template>
        <template v-else>
          <el-option v-for="(item, index) in fields" :key="index" :value="item.key" :label="item.name" />
        </template>
      </el-select>

      <!-- 操作符 -->
      <el-select
        v-model="model.operator"
        :size="size"
        :disabled="disabled"
        class="mr-10 select_rule"
        placeholder="请选择"
        @change="onOperatorChange"
      >
        <el-option :value="rule.value" :label="rule.label" v-for="(rule, key) in operatorOptions" :key="key" />
      </el-select>

      <!-- 字段值 -->
      <div class="check_value" v-if="isLoadValueWidget(model.display)">
        <ConditionItemValue
          :default-value="model.value"
          :display="model.display"
          :fieldType="currentField.type"
          :options="currentField.options"
          :disabled="disabled"
          :component-props="{ ...(currentField.componentProps || {}), size }"
          @update:defaultValue="onUpdateDefaultValue"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, inject, PropType, defineComponent, watch, Ref, computed } from 'vue'
import { Field, Model, Obj, Option } from '@/model'
import ConditionItemValue from './condition-item-value.vue'
import { COMPONENT_SIZE, FIELDS_TOKENS } from '@/util/tokens'
import { ConnectEnum, DisplayModelEnum, WidgetTypeEnum } from '@/util/operator-enum'
import { ConnectOptions } from '@/util/default-options'
import { useDateParamTransform } from '@/util/hooks'

type Not<T> = {
  [P in keyof T]?: T[P]
}

export default defineComponent({
  name: 'condition-item',
  components: {
    ConditionItemValue
  },
  props: {
    showConnect: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    showField: {
      type: Boolean,
      default: true
    },
    connect: Number as PropType<ConnectEnum>,
    data: Object as PropType<Model>,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change-connect'],
  setup(props, context) {
    context.expose({ getModel })

    const model = ref({}) as Ref<Not<Model>>
    const operatorOptions = ref<Option[]>([])
    const currentField = ref<Not<Field>>({})
    const localConnect = ref<ConnectEnum>()
    const isShowConnect = ref<boolean>(true)

    const transform = useDateParamTransform()
    const fields = inject(FIELDS_TOKENS)
    const size = inject(COMPONENT_SIZE)
    const isGroup = computed(() => {
      return fields?.find((f) => Array.isArray(f.groupOptions))
    })

    watch(() => props.data, setDefaultModel, { immediate: true, deep: true })
    function setDefaultModel() {
      if (!props.data) return
      handleKeyChange(props.data.key as string)
      model.value = {
        ...model.value,
        ...props.data
      }
    }

    watch(
      props,
      () => {
        localConnect.value = props.connect
        isShowConnect.value = props.showConnect as boolean
      },
      { deep: true, immediate: true }
    )

    /**
     * 操作符改变
     */
    const onOperatorChange = () => {
      const list = (currentField.value as Field).rule
      const find = list.find((f) => f.value === model.value.operator)
      if (find && model.value.display !== find.display) {
        model.value.display = find.display
        model.value.value = undefined
      }
    }
    const onUpdateDefaultValue = (v: never) => (model.value.value = v)
    const isLoadValueWidget = (display: DisplayModelEnum) => DisplayModelEnum.NONE !== display

    /**
     * key改变,根据字段获取对应的operator
     * @param key
     */
    function handleKeyChange(key: string) {
      let field
      if (isGroup.value) {
        let arr: Obj[] = []
        fields &&
          fields.forEach((item: Obj) => {
            arr = arr.concat(item.groupOptions)
          })
        field = arr.find((f) => f.key === key)
      } else {
        field = fields && fields.find((f) => f.key === key)
      }
      model.value.value = undefined
      model.value.operator = undefined
      model.value.display = undefined
      if (field) {
        currentField.value = field
        operatorOptions.value = field.rule
      }
    }

    function getModel() {
      const dates = [WidgetTypeEnum.DATE, WidgetTypeEnum.DATE_TIME, WidgetTypeEnum.TIME]
      const value = {
        ...model.value,
        field: currentField.value
      }
      if (currentField.value.type && dates.includes(currentField.value.type)) {
        value.value = transform.transform(value.value)
      }
      return value
    }

    return {
      isShowConnect,
      handleKeyChange,
      onOperatorChange,
      onUpdateDefaultValue,
      isLoadValueWidget,
      isGroup,
      operatorOptions,
      model,
      emits: context.emit,
      ConnectOptions,
      currentField,
      fields,
      localConnect,
      size
    }
  }
})
</script>
<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='“number”'] {
  -moz-appearance: textfield;
}

.condition-item {
  padding: 10px 10px 0;
  display: flex;
  align-items: center;
  .close-icon {
    margin-right: 10px;
    color: #c7c7c7;
    cursor: pointer;
    width: 14px;
  }
  &-container {
    display: flex;
    justify-content: left;
    .el-input__inner {
      text-align: left;
    }
    .mr-10 {
      margin-right: 10px;
    }
    .select_operate {
      width: 80px;
    }
    .select_key {
      width: 167px;
    }
    .select_rule {
      width: 120px;
    }
    .check_value {
      display: flex;
      align-items: center;
      .separator {
        margin: 0 4px;
        line-height: 100%;
        display: flex;
        align-items: center;
      }
      .el-input,
      .el-select,
      .el-input-number {
        width: 167px !important;
        .el-input__inner {
          text-align: left;
        }
      }
    }
  }
}
</style>
