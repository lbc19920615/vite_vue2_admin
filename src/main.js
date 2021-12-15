import Vue from 'vue/dist/vue.esm'
import App from './App.vue'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.config.productionTip = false

globalThis.Vue = Vue

import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import {initZForm} from "@/zform/main";
Vue.use(initZForm)


window.startApp = function () {

  // console.log(globalThis.ZY)
  let app = new Vue({
    render: h => h(App),
  }).$mount('#app');

}
