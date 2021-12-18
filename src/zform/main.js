// import SlotCom from "./SlotCom.vue";
// import CmField from "./CmField.vue";

import './components/base';
import './components/richtext';
import {install} from "@/zform/coms";



function initSfc({app, Vue} = {}) {
  let templateSfc = function (sfc) {
    if (sfc.template) {
      return sfc.template.content
    }
    return ''
  }

  async function createDef(h = '') {
    return new Promise(resolve => {
      let id = 'fun__' + ZY.rid();
      let script = document.createElement('script');
      script.type = 'module';
      script.innerHTML = `let callback = '${id}';` + h;
      document.body.append(script)
      globalThis[id] = function ({comName, def}) {
        app.component(comName, def);
        Vue.nextTick(() => {
          resolve({
            comName, def
          });
        })
      }
    })
  }

  async function parseVueComponent({handleScript, styles = [], template = '' } = {}) {
    try {
      // console.log('this.formDef', this.formDef)
      // console.log(def)
      // let data = new FormData()
      // data.append('source', JSON.stringify(def))
      // let tpl = template;
      // console.log('cached_tpl', cached_tpl)
      let sfc = globalThis.ZY_EXT.parseComponent(template)
      // const templateId = comName + '-tpl';
      // console.log(template)
      // let styleSheets = []
      if (Array.isArray(sfc.styles) && sfc.styles.length > 0) {
        styles = styles.concat(sfc.styles)
      }

      styles.forEach(styleObj => {
        let styleDom = document.createElement('style')
        styleDom.id = ZY.nid()
        styleDom.innerText = styleObj.content
        document.body.appendChild(styleDom)
        // styleSheets.push(styleDom)
      })
      let scriptStr = sfc.script.content
      // if (handleScript) {
      //   scriptStr = handleScript(scriptStr)
      // }

      let {comName} = await createDef(scriptStr)
      // let vuetpl = templateSfc(sfc)

      // let res = await ZY.importJsStr(scriptStr)
      // ZY.DOM.initTemplate(templateId, globalThis.document, {
      //   html: `${templateSfc(sfc)}`,
      // });
      return {
        // script: res,
        sfc,
        comName,
      }
    } catch (e) {
      console.error(e)
    } finally {
      //
    }
  }
  globalThis.zParseVueComponent = parseVueComponent
}

let vueVersion = 0;
globalThis.getZFormMeta = function (instanse) {
  let appName;
  if (instanse.appContext) {
    appName = instanse.appContext.app.config.globalProperties.name
  }
  appName = globalThis.__zFormCachedVue__.name;
  if (appName) {
    return zFormMetas.get(appName)
  }
}

let zFormMetas = new Map();

function getAppName(app, Vue) {
  vueVersion = parseInt(Vue.version);
  if (vueVersion < 3) {
    return Vue.name
  }
  return app.config.globalProperties.name
}

export function initZForm(app, Vue) {


  globalThis.__zFormCachedVue__ = app;
  initSfc({app, Vue});
  // console.log(Vue)
  function buildVueComponentMan() {
    class ret {
      static defMap = new Map()
      static components = {}
      static app = null
      static component(name, ctx) {
        // console.log(this)
        this.app.component(name, ctx)
        this.defMap.set(name, ctx)
        this.components[name] = ctx
      }
      static register(ctx, name = ctx.name) {
        // console.log(this.app)
        this.component(name, ctx)
      }
      static unRegister(name) {
        Reflect.deleteProperty( this.app.options.components, name)
        this.defMap.delete(name)
        Reflect.deleteProperty(this.components, name)
      }
      static resolve(str) {
        let components = this.app.options.components
        let comName = ZY.lodash.upperFirst(ZY.lodash.camelCase(str))
        if (components[comName]) {
          return components[comName]
        }
        return str
      }
    }
    return ret
  }

  // class CustomVueComponent extends buildVueComponentMan() {}
  // globalThis.CustomVueComponent = CustomVueComponent

  class CustomDymComponent extends buildVueComponentMan() {}
  // globalThis.CustomDymComponent = CustomDymComponent

  CustomDymComponent.app = app
  let appName = getAppName(app, Vue);
  // console.log(appName)
  if (appName) {
    zFormMetas.set(appName, {
      CustomDymComponent
    })
  }

  install(app, Vue, appName);
  // CustomVueComponent.app = app

}
