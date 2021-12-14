<template>
  <div class="cm-field" :class="['cm-field__'+prop]">
    <el-form-item   v-bind="ui ? ui.form_item : {}" v-if="state.comReady">
      <!--    <el-input v-model="state.value" @input="onInput"></el-input>-->
      <!--    <test-input-widget v-model="state.value" @input="onInput"></test-input-widget>-->
      <!--    {{widgetUUID}}-->
      <template v-if="showLabel(ui)" v-slot:label="">
        <div class="cm-filed__label">{{getLabel()}}</div>
      </template>
      <component :is="widgetUUID"></component>
      <div class="cm-filed__desc"><div>{{getDesc()}}</div></div>
    </el-form-item>
  </div>
</template>

<script>
import {inject, onBeforeMount, onBeforeUnmount, provide, reactive, watch} from '@vue/composition-api'

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

    let curFormCon = inject('curFormCon');
    let prop_config = props.prop_config ?? {};
    let isLocked = false;
    // const context = props.context;
    const uuid = 'cm-field-' + ZY.cid(10);
    let widgetUUID = uuid + '__widget__' + ZY.rid(10).toLowerCase()

    let lodash = ZY.lodash;
    let state = reactive({
      comReady: false,
      value: props.modelValue ?? null,

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

    function initValue(oldVal) {
      if (Array.isArray(oldVal)) {

        // console.log(Array.isArray(oldVal), oldVal, state.value)
        // if (typeof state.value === 'undefined' || state.value === null) {
        //   return oldVal
        // }
        return oldVal
      }
      return state.value
    }

    function getLabel() {
      return lodash.get(props.prop_config, ['ui', 'label'])
    }

    function getDesc() {
      return lodash.get(props.prop_config, ['ui', 'desc'])
    }


    function showLabel() {
      if (props.ui && props.ui.hiddenLabel) {
        return false;
      }
      return true;
    }

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
      showLabel,
      getDesc,
      getLabel,
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

    let cmFieldTpl = curFormCon.fieldMixin(prop_config)

    let baseZFormComMixin = {
      data() {
        return {
        }
      },
      methods: {
        buildOptions(ui) {
          let _widget = ZY.lodash.get(ui, ['widgetConfig'])
          let options = []
          // console.log(_widget)
          if (_widget.options2) {
            try {
              let opt = ZY.JSON5.parse(_widget.options2)
              options = options.concat(opt)
            } catch (e) {
              //
            }
          }
          // console.log(_widget, widgetConfig2)
          return options
        }
      }
    }

    globalThis.CustomDymComponent.register({
      name: widgetUUID,
      mixins: [
        baseZFormComMixin,
        cmFieldTpl
      ],
      inject: ['CurCmField'],
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
        this.value = this.CurCmField.initValue(this.value)
      },
      mounted() {
        // console.log(this.CurCmField)
      }
    })

    onBeforeMount(() => {
      state.comReady = true
    })

    onBeforeUnmount(() => {
      globalThis.CustomDymComponent.unRegister(widgetUUID)
    })

    provide('CurCmField', ret);

    return ret;
  }
}
</script>
