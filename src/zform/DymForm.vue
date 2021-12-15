<template>
  <div class="dym-form">
<!--    <el-button @click="destory">destory</el-button>-->
    <template v-if="state.comReady">
      <component :is="comName"></component>
    </template>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  // toRaw,
  // computed,
  // watchEffect,
  // onMounted,
  // onBeforeMount,
  // onUpdated,
  // onBeforeUpdate,
  ref, onBeforeUnmount, provide
} from "@vue/composition-api";
import Vue from 'vue/dist/vue.esm'
import {configToComponent} from "./DymFormHooks";

const COM_PREFIX = 'dym-form__';

export default defineComponent({
  name: "DymForm",
  props: {
    title: String,
    config: Object,
    varName: {
      type: String,
      default: 'Z_FORM_TPL'
    },
    debug: Boolean
  },
  setup(props, outerCtx) {
    let ZY_EXT = globalThis.ZY_EXT;
    let JSON5 = ZY.JSON5;
    let comName = COM_PREFIX + ZY.lodash.kebabCase(ZY.rid());


    // console.log("Props", props, ctx);
    /**
     * Reactive Data, Computed
     */
    const state = reactive({
      comReady: false
    });


    async function init(config) {
      // console.log(formDef)
      // console.log(configToComponent)
      // let html = document.getElementById(props.varName)?.innerHTML ?? '';
      let html = globalThis[props.varName]
      if (props.debug) {
        config.debug = true
      }
      // console.log(config)
      let com = configToComponent(comName,
          config,
          html,
          {
            outerCtx
          }
      )
      globalThis.CustomDymComponent.register(com);
      Vue.nextTick(() => {
        state.comReady = true
      })
    }

    init(props.config);

    function destory() {
      state.comReady = false
    }

    onBeforeUnmount(() => {
      globalThis.CustomDymComponent.unRegister(comName);
    })

    return {
      // States
      comName,
      destory,
      state,
      // Methods
    };
  }
});

</script>

<style>
</style>
