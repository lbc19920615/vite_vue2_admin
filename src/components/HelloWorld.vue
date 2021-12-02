<template>
  <div>
    <button @click="loadFile">加载</button>
    <template v-if="state.comReady">
      <test-dom></test-dom>
    </template>
<!--    <div>-->
<!--      <strong>Counter</strong>-->
<!--      <p>Please Open Console</p>-->
<!--    </div>-->
<!--    <div>-->
<!--      <button @click="decrease">-</button>&nbsp;-->
<!--      <span>{{ state.count }}</span>&nbsp;-->
<!--      <button @click="increase">+</button>-->
<!--    </div>-->
<!--    <br>-->
<!--    <div>-->
<!--      <div>Doubled : {{ state.doubled }}</div>-->
<!--      <div>Tripled : {{ tripleCount }}</div>-->
<!--    </div>-->
<!--    <br>-->
<!--    <div>Another Counter : {{ anotherCounter }}</div>-->
<!--    <br>-->
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
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
  setup(props, ctx) {
    let ZY_EXT = globalThis.ZY_EXT;
    let JSON5 = ZY.JSON5;

    // console.log("Props", props, ctx);
    /**
     * Reactive Data, Computed
     */
    const state = reactive({
      count: 0,
      doubled: computed(() => state.count * 2),
      comReady: false
    });

    const tripleCount = computed(() => state.count * 3);

    /**
     * ref. not ref on template
     */
    const anotherCounter = ref(0);

    /**
     * Watcher
     */
    watchEffect(() => {
      if (state.count % 2 === 0) {
        console.log("[WATCH] Data Updated -> state.count is even.");
      }
      if (state.doubled) {
        console.log(
            "[WATCH] Another wather -> state.doubled -> ",
            state.doubled
        );
      }
    });

    watchEffect(() => {
      if (tripleCount) {
        console.log("[WATCH] Computed Property Updated -> ", tripleCount.value);
      }
    });

    /**
     * Methods
     */
    function increase() {
      state.count++;
      anotherCounter.value++;
    }

    function decrease() {
      state.count--;
      anotherCounter.value--;
    }

    /**
     * Life Cycle Hooks
     */
    onMounted(() => {
      console.log("[LifeCycle] onMounted === mounted");
    });

    onBeforeMount(() => {
      console.log("[LifeCycle] onBeforeMount === beforeMount");
    });

    onUpdated(() => {
      console.log("[LifeCycle] onUpdated === updated");
    });

    onBeforeUpdate(() => {
      console.log("[LifeCycle] onBeforeUpdate === beforeUpdate");
    });


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
        name: 'test-dom',
        template: html,
        setup(props) {
          function initPart(partDef) {
            let rowDef = partDef.def;
            console.log(rowDef)
            let model = reactive({})

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

          console.log(parts)

          function getUI_CONFIG() {
            return {}
          }

          let slotContent = (function() {
            if (props.render) {
              return props.render()
            }
            return {
              default: []
            }
          })()

          let instanse = {
            config,
            parts,
            slotContent,
            getUI_CONFIG,
          }
          return instanse
        }
      }
    }

    async function init() {
      const store_vars = await ZY_EXT.store.getItem(STORE_NAME);
      let formVal = JSON5.parse(store_vars.value)
      let formDef = buildFormDep(formVal, store_vars.name, {
        src: 'comformscr2.twig'
      });
      // console.log(formDef)
      let config = formDef.init.def;

      let com = configToComponent(config)
      Vue.component(com.name, com);
      Vue.nextTick(() => {
        state.comReady = true
      })
    }

    init();

    return {
      // States
      state,
      tripleCount,
      loadFile,
      anotherCounter,
      // Methods
      increase,
      decrease
    };
  }
});

</script>

<style>
</style>
