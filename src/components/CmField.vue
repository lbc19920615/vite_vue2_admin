<template>
  <el-form-item v-if="state.comReady">
<!--    <el-input v-model="state.value" @input="onInput"></el-input>-->
<!--    <test-input-widget v-model="state.value" @input="onInput"></test-input-widget>-->
<!--    {{widgetUUID}}-->
    <component :is="widgetUUID"></component>
  </el-form-item>
</template>

<script>
import {ref, watch, provide, onBeforeUnmount, reactive} from '@vue/composition-api'

export default {
  name: 'CmField',
  props: {
    prop: String,
    label: String,
    type: String,
    formPath: String,
    parentModel: null,
    modelValue: null,
    part_key: String,
    context: null,
    selfpath: String,
    pathArr: Array,
    prop_config: Object,
    ui: {
      type: Object,
      default() {
        return {};
      },
    },
    rules: {
      type: Array,
      default() {
        return [];
      },
    },
    slotContent: null,
  },
  setup(props, { emit }) {

    let prop_config = props.prop_config ?? {};
    let isLocked = false;
    // const context = props.context;
    const uuid = 'cm-field-' + ZY.lodash.camelCase(ZY.rid());

    let state = reactive({
      comReady: false,
      value: props.modelValue ?? null
    })

    // console.log(lock)

    function onInput(v) {

      // console.log('sdsdsds', v, isLocked)
      if (!isLocked) {
        isLocked = true;
        emit('val-change', v);
        setTimeout(() => {
          // ZY.PubSub.publish('value-change', v)
          isLocked = false
        },150);
      }
    }
    let onChange = onInput

    function initValue() {
      return state.value
    }

    let widgetUUID = uuid + '__' + 'test-input-widget'
    let ele = null
    let ret =  {
      register(sel) {
        ele = sel
      },
      cmFieldUUID: uuid,
      state,
      onChange,
      initValue,
      widgetUUID,
      onInput,
    }

    watch(() => props.modelValue, function(newVal) {
      if (!isLocked) {
        console.log('cmfield watch', newVal, ele)
        // state.value = newVal
        ele.setVal(newVal)
      }
    }, {
    })

    globalThis.CustomDymComponent.register({
      name: widgetUUID,
      template: '<el-input v-model="value" @input="onInput"></el-input>',
      inject: ['CurCmField'],
      data() {
        return {
          value: null
        }
      },
      methods: {
        onInput(v) {
          this.CurCmField.onInput(v)
        },
        setVal(v) {
          this.value = v
        }
      },
      beforeMount() {
        // console.log(this.CurCmField)
        this.CurCmField.register(this)
        this.value = this.CurCmField.initValue()
      },
      mounted() {
        // console.log(this.CurCmField)
      }
    })

    state.comReady = true

    provide('CurCmField', ret);

    return ret;
  }
}
</script>
