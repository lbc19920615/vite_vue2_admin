import Vue from 'vue/dist/vue.esm'
import App from './App.vue'
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.config.productionTip = false

globalThis.Vue = Vue

class CustomVueComponent {
  static defMap = new Map()
  static components = {}
  static app = null
  static component(name, ctx) {
    this.app.component(name, ctx)
    this.defMap.set(name, ctx)
    this.components[name] = ctx
  }
  static register(ctx, name = ctx.name) {
    this.component(name, ctx)
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
globalThis.CustomVueComponent = CustomVueComponent

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
}
