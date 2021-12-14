import Vue from 'vue/dist/vue.esm'
import App from './App.vue'
import VueCompositionApi from "@vue/composition-api";

Vue.use(VueCompositionApi);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

Vue.config.productionTip = false

globalThis.Vue = Vue

import {initZForm} from "@/zform/main";

Vue.use(initZForm)

import '@/zform/components/base';
import '@/zform/components/richtext';

window.startApp = function () {

  // console.log(globalThis.ZY)
  let app = new Vue({
    render: h => h(App),
  }).$mount('#app');

}
