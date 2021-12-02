<template>
  <div>
    <el-button @click="loadFile">加载</el-button>
    <template v-if="state.comReady">
      <component :is="comName"></component>
    </template>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRaw,
  computed,
  watchEffect,
  onMounted,
  onBeforeMount,
  onUpdated,
  onBeforeUpdate,
  ref
} from "@vue/composition-api";
import {buildFormDep} from "@/hooks/build";
import {renderForm} from "@/hooks/tpllib";
import Vue from 'vue/dist/vue.esm'

const STORE_NAME = 'test-vue2';

export default defineComponent({
  name: "CompositionCounter",
  props: {
    title: String
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  setup(props, outerCtx) {
    let ZY_EXT = globalThis.ZY_EXT;
    let JSON5 = ZY.JSON5;
    let comName = 'hello-world' + ZY.lodash.camelCase(ZY.rid());

    // console.log("Props", props, ctx);
    /**
     * Reactive Data, Computed
     */
    const state = reactive({
      comReady: false
    });


    /**
     * Life Cycle Hooks
     */
    // onMounted(() => {
    //   console.log("[LifeCycle] onMounted === mounted");
    // });
    //
    // onBeforeMount(() => {
    //   console.log("[LifeCycle] onBeforeMount === beforeMount");
    // });
    //
    // onUpdated(() => {
    //   console.log("[LifeCycle] onUpdated === updated");
    // });
    //
    // onBeforeUpdate(() => {
    //   console.log("[LifeCycle] onBeforeUpdate === beforeUpdate");
    // });


    async function loadFile() {
      let obj = await ZY_EXT.fileOpenJSON5();
      if (obj.data) {
        try {
          let cloned = JSON5.parse(JSON5.stringify(obj.data));
          // console.log(cloned)
          ZY_EXT.store.setItem(STORE_NAME, cloned)
        } catch (e) {
          console.log('loadFile parse err', e)
        }
      }
    }


    function renderCOM(formCONFIG) {
      let partStr = {};
      if (Array.isArray(formCONFIG.parts)) {
        formCONFIG.parts.forEach((part, index) => {
          // console.dir(part.def, {
          //   depth: null
          // });
          const modelKey = 'parts.' + part.name + '.model';
          const partConfigKey = 'config.parts[' + index + '].def';

          partStr[part.name]  = renderForm(part.def, modelKey, partConfigKey,
              { part, BASE_PATH: modelKey, CONFIG: formCONFIG, partKey: `parts.${part.name}` })
        })
      }
      // console.log(partStr)
      return partStr;
    }



    function configToComponent(config) {
      let compileData = {}

      compileData.CONFIG = config;
      compileData.partStr = renderCOM(config);


      let tpl = document.getElementById('formTpl').innerHTML
      let t = globalThis.Twig.twig({
        // id: tplID,
        data: tpl,
        allowInlineIncludes: true
      });
      let html = t.render(compileData)

      console.log(html)
      return {
        name: comName,
        template: html,
        props: {
          debug: {
            type: Boolean
          },
          modelValue: null,
          render: null
        },
        setup(props, ctx) {
          let lodash = ZY.lodash;

          function initPart(partDef) {
            let rowDef = partDef.def;
            let obj = ZY.formModel.create(rowDef)
            // console.log(obj, rowDef)
            let model = reactive(obj)

            // const modelKey = 'parts.' + part.name + '.model';
            // const partConfigKey = 'config.parts[' + index + '].def';
            //
            // partStr[part.name]  = BASE_renderForm(part.def, modelKey, partConfigKey,
            //     { part, BASE_PATH: modelKey, CONFIG, partKey: `parts.${part.name}` })
            //
            //
            return {
              model
            }
          }

          let parts = {};
          if (Array.isArray(config.parts)) {
            config.parts.forEach(part => {
              parts[part.name] = initPart(part)
            })
          }

          // console.log(parts)

          function getUI_CONFIG(path) {
            return lodash.get({
              config
            }, path)
          }

          let slotContent = (function() {
            if (props.render) {
              return props.render()
            }
            console.log(outerCtx)
            if (outerCtx.slots) {
              return outerCtx.slots
            }
            return {
              default: []
            }
          })()


          // function structuralClone(obj) {
          //   return new Promise(resolve => {
          //     const {port1, port2} = new MessageChannel();
          //     port2.onmessage = ev => resolve(ev.data);
          //     port1.postMessage(obj);
          //   });
          // }

          function updateValue(partName = '', pathArr = [], e) {
            let s_path = ZY.getObjPathFromPathArr(pathArr);
            let model = parts[partName].model;
            lodash.set(model, s_path, e);
          }

          let exportCtx = {
            getRawData(partName, {jsonLib = JSON5} = {}) {
              let observed =  parts[partName].model
              console.log(observed)
              return ZY.structuralClone(observed)
            }
          }

          let instanse = {
            config,
            exportCtx,
            parts,
            slotContent,
            updateValue,
            getUI_CONFIG,
          }
          return instanse
        }
      }
    }

    async function init() {
      const store_vars = await ZY_EXT.store.getItem(STORE_NAME);
      let formVal = JSON5.parse(store_vars?.value ?? [])
      let formDef = buildFormDep(formVal, store_vars.name, {
        src: 'comformscr2.twig'
      });
      // console.log(formDef)
      let config = formDef.init.def;

      let com = configToComponent(config)
      globalThis.CustomDymComponent.register(com);
      Vue.nextTick(() => {
        state.comReady = true
      })
    }

    init();

    return {
      // States
      comName,
      state,
      loadFile,
      // Methods
    };
  }
});

</script>

<style>
</style>
