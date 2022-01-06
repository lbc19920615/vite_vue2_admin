import './components/base';
import './components/richtext';
import {install} from "./coms";
import {registerCachedVue, setZFormMeta} from "./glo";


globalThis.ZForm = {}
globalThis.ZForm.version = '0.6.0'
globalThis.ZForm.document = document
let zFormMetas = new Map();
let vueVersion = 0;

function initSfc({app, Vue} = {}) {
  let templateSfc = function (sfc) {
    if (sfc.template) {
      return sfc.template.content
    }
    return ''
  }

  async function createDef(h = '') {
    let document = globalThis.ZForm.document
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

  async function parseVueComponent({handleScript, styles = [], template = '', metas = {} } = {}) {
    try {
      // console.log('this.formDef', this.formDef)
      // console.log(def)
      // let data = new FormData()
      // data.append('source', JSON.stringify(def))
      // let tpl = template;
      // console.log('cached_tpl', cached_tpl)
      let tplId = 'tpl__' + ZY.rid();
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
      let vuetpl = templateSfc(sfc);


      let s = document.createElement('script');
      s.type = 'text/html';
      s.id = tplId;
      s.innerHTML = vuetpl
      document.body.append(s);


      scriptStr = scriptStr.replace('[[TPL_ID]]', tplId)
      scriptStr  = scriptStr.replace('[[metas]]', ZY.JSON5.stringify(metas))

      let {comName} = await createDef(scriptStr)


      // console.log(scriptStr)

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
      console.error(e);
      return Promise.reject(e);
    } finally {
      //
    }
  }
  globalThis.zParseVueComponent = parseVueComponent
  globalThis.ZForm.parseVueComponent = parseVueComponent
}


function getZFormMeta(instanse) {
  let appName;
  if (instanse && instanse.appContext && instanse.appContext.app) {
    appName = instanse.appContext.app.config.globalProperties.name
  } else {
    appName = globalThis.__zFormCachedVue__.name;
  }
  if (appName) {
    return zFormMetas.get(appName)
  }
}
globalThis.zFormMetas = zFormMetas
globalThis.ZForm.getZFormMeta = getZFormMeta

function getAppName(app, Vue) {
  vueVersion = parseInt(Vue.version);
  if (vueVersion < 3) {
    return Vue.name
  }
  return app.config.globalProperties.name
}

export function initZForm(app, Vue) {


  globalThis.__zFormCachedVue__ = app;
  registerCachedVue(app);
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
    });
    setZFormMeta(appName, {
      CustomDymComponent
    });
  }

  install(app, Vue, appName);
  // CustomVueComponent.app = app

}
