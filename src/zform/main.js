import SlotCom from "./SlotCom.vue";
import CmField from "./CmField.vue";

import './components/base';
import './components/richtext';

function initSfc({Vue} = {}) {
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
        Vue.component(comName, def);
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


export function initZForm(Vue) {
  globalThis.__zFormCachedVue__ = Vue;
  initSfc({Vue});
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

  class CustomVueComponent extends buildVueComponentMan() {}
  globalThis.CustomVueComponent = CustomVueComponent

  class CustomDymComponent extends buildVueComponentMan() {}
  globalThis.CustomDymComponent = CustomDymComponent


  Vue.component(SlotCom.name, SlotCom);
  Vue.component(CmField.name, CmField)
  CustomVueComponent.app = Vue
  CustomDymComponent.app = Vue
}
