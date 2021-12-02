import Vue from 'vue/dist/vue.esm'
import App from './App.vue'
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.config.productionTip = false

globalThis.Vue = Vue

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

import SlotCom from "@/components/SlotCom";
Vue.component(SlotCom.name, SlotCom);
import CmField from "@/components/CmField";
Vue.component(CmField.name, CmField)

window.startApp = function () {

  // console.log(globalThis.ZY)
  let app = new Vue({
    render: h => h(App),
  }).$mount('#app');
  CustomVueComponent.app = Vue
  CustomDymComponent.app = Vue
}
