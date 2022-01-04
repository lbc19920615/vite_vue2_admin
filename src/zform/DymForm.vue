<style lang="scss">
.dym-form {
  .el-form:not(.el-form--label-top) {
    .el-form-item {
      display: flex;
      align-items: center;
    }
    .el-form-item__content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      flex: 1;
    }
  }
}
</style>

<template>
  <div class="dym-form">
<!--    <el-button @click="destory">destory</el-button>-->
    <template v-if="state.comReady">
      <component :is="comName"></component>
    </template>
  </div>
</template>

<script>
import {configToFormComponent} from "./render.js";
import {getCachedVue} from "./glo";

const COM_PREFIX = 'dym-form__';

export default {
  name: "DymForm",
  props: {
    title: String,
    config: Object,
    metas: {
      type: Object,
      default() {
        return {}
      },
    },
    varName: {
      type: String,
      default: 'Z_FORM_TPL'
    },
    debug: Boolean
  },
  setup(props, outerCtx) {
    const {
      reactive,
      getCurrentInstance,
      onBeforeUnmount
    } = globalThis.vueCompositionAPI;
    let instanse = getCurrentInstance();
    let meta = globalThis.ZForm.getZFormMeta(instanse);
    // let ZY_EXT = globalThis.ZY_EXT;
    // let JSON5 = globalThis.ZY.JSON5;
    // console.log(outerCtx)
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
      // let html = document.getElementById(props.varName)?.innerHTML ?? '';
      let html = globalThis[props.varName]
      if (props.debug) {
        config.debug = true
      }
      // console.log(config)
      let com = configToFormComponent(comName,
          config,
          html,
          {
            outerCtx,
            outerProps: props
          }
      )
      meta.CustomDymComponent.register(com);
      // globalThis.__zFormCachedVue__
      getCachedVue()
          .nextTick(() => {
        state.comReady = true
      })
    }

    init(props.config);

    function destory() {
      state.comReady = false
    }

    onBeforeUnmount(() => {
      meta.CustomDymComponent.unRegister(comName);
    })

    return {
      // States
      comName,
      destory,
      state,
      // Methods
    };
  }
};

</script>

<style>
</style>
