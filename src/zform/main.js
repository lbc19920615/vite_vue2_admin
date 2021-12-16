import SlotCom from "./SlotCom.vue";
import CmField from "./CmField.vue";

import './components/base';
import './components/richtext';

export function initZForm(Vue) {
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
