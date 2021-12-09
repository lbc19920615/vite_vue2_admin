import {provide, reactive, getCurrentInstance} from "@vue/composition-api";
import {renderForm} from "../hooks/tpllib";

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


export function configToComponent(comName, config, tpl, {
  outerCtx
} = {}) {
  let compileData = {}

  compileData.CONFIG = config;
  compileData.partStr = renderCOM(config);

  let t = globalThis.Twig.twig({
    // id: tplID,
    data: tpl,
    allowInlineIncludes: true
  });
  let html = t.render(compileData)

  // console.log(html)
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
    methods: {
      getRef(partName) {
        return this.$refs['comformscr2__' + partName]
      }
    },
    setup(props, ctx) {
      let instanse = getCurrentInstance()
      let lodash = ZY.lodash;

      function getRef(partName) {
        return instanse.refs['comformscr2__' + partName]
      }

      function initPart(partDef) {
        let rowDef = partDef.def;
        let obj = ZY.formModel.create(rowDef)
        // console.log(obj, rowDef)
        let model = reactive(obj)

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

      function updateValue(partName = '', pathArr = [], e) {
        let s_path = ZY.getObjPathFromPathArr(pathArr);
        let model = parts[partName].model;
        lodash.set(model, s_path, e);
      }

      let exportCtx = {
        /**
         * 提交
         * @param partName
         * @returns {Promise<unknown>}
         */
        async submit(partName) {
          let self = this;
          return new Promise(resolve => {
            let ele = getRef(partName);
            ele.validate(function (isValid, errors = []) {
              // console.log(isValid, errors)
              resolve([isValid, errors])
            });
          })
        },
        getRawData(partName) {
          let observed =  parts[partName].model
          // console.log(observed)
          return ZY.structuralClone(observed)
        }
      }

      let comIns = {
        config,
        exportCtx,
        parts,
        slotContent,
        updateValue,
        getUI_CONFIG,
        fieldMixin(propConfig) {
          // console.log(propConfig)
          if (propConfig.sub_type === 'time') {
            return {
              template: `<el-time-picker
        v-model="value"
        @change="onInput"
        v-bind="ui.widgetConfig"
    >
    </el-time-picker>`,
              data() {
                return {
                  ui: propConfig.ui,
                }
              }
            }
          }

          return {
            template: '<el-input v-model="value" @input="onInput" v-bind="ui.widgetConfig"></el-input>',
            data() {
              return {
                ui: propConfig.ui,
              }
            }
          }
        }
      }


      provide('curFormCon', comIns)

      return comIns
    }
  }
}
