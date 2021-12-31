import {provide, reactive, getCurrentInstance, watch} from "@vue/composition-api";
import {renderForm} from "./hooks/tpllib";

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

let fieldMixinDefMap = new Map();
export function defZFormFieldCom(name, value) {
  fieldMixinDefMap.set(name, value)
}

function flattenObject(ob) {
  var toReturn = {};

  for (var i in ob) {
    // eslint-disable-next-line no-prototype-builtins
    if (!ob.hasOwnProperty(i)) continue;

    if ((typeof ob[i]) == 'object' && ob[i] !== null) {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        // eslint-disable-next-line no-prototype-builtins
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

export function configToComponent(comName, config, tpl, {
  outerCtx,
  outerProps
} = {}) {
  let compileData = {}

  compileData.CONFIG = config;
  compileData.partStr = renderCOM(config);

  // console.log(compileData.partStr)
  let str = Object.entries(compileData.partStr)[0][1]
  // console.log(str)

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
      let JSON5 = ZY.JSON5;
      let lodash = ZY.lodash;

      function getRef(partName) {
        return instanse.refs['comformscr2__' + partName]
      }

      let watchHandleMap = new Map();
      function registerWatchHandle(key, value) {
        watchHandleMap.set(key, value)
      }

      function initPart(partDef) {
        let cachedModel = '{}';
        let rowDef = partDef.def;
        let obj = ZY.formModel.create(rowDef)
        // console.log(obj, rowDef)
        let model = reactive(obj);
        let modelLocks = false;

        watch(model, (newVal, oldVal) => {
          let newObj = JSON5.parse(JSON5.stringify(newVal));
          let objKeys = Object.keys(newObj)
          let oldObj = JSON5.parse(cachedModel)
          let diffed = ZY.diff(oldObj, newObj);
          let flattenD = flattenObject(diffed);

          if (!modelLocks) {
            // console.log('watch', flattenD)
            let flattenDKeys = Object.keys(flattenD)
            watchHandleMap.forEach(function (item, key) {
              let isContains = lodash.difference(key, objKeys).length < 1;
              let flattenDHas = lodash.difference(flattenDKeys, key).length < 1;
              // console.log(flattenDHas, key, flattenDKeys)
              if (isContains && flattenDHas) {
                console.log('changed', key, )
                modelLocks = true
                item.run(model);
                setTimeout(() => {
                  modelLocks = false
                }, 300)
              }
              // console.log(objKeys, key, isContains)
            })

          }

          cachedModel = JSON5.stringify(newObj)
        })

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
        // console.log(outerCtx)
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
        },
        getMetas() {
          return outerProps?.metas
        }
      }



      let comIns = {
        config,
        exportCtx,
        parts,
        registerWatchHandle,
        slotContent,
        updateValue,
        getUI_CONFIG,
        fieldMixin(propConfig) {
          // console.log(propConfig)
          let ui = ZY.lodash.get(propConfig, ['ui'], {})
          let widget = ZY.lodash.get(propConfig, ['ui', 'widget'], '')
          if (ui.custom) {
            widget = propConfig?.ui?.cusWidget ?? ''
            // return {
            //   template: `<div>${widget}</div>`,
            //   data() {
            //     return {
            //       ui: propConfig.ui,
            //     }
            //   }
            // }
          }
          if (widget && fieldMixinDefMap.has(widget)) {
            return fieldMixinDefMap.get(widget).create(propConfig)
          }
          return {
            template: `<div>${widget}</div>`,
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
