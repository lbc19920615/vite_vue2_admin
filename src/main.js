import Vue from 'vue/dist/vue.esm'
import App from './App.vue'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.config.productionTip = false

globalThis.Vue = Vue


import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);



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
  globalThis.parseVueComponent = parseVueComponent
}

initSfc({Vue})

import  { initZForm } from '@/zform/init';
Vue.use(initZForm);

import { request } from '@/plugins/z-request/index.js'
globalThis.Req = request;






import './customZfield';

let app = new Vue({
  render: h => h(App),
}).$mount('#app');
