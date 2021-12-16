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

import { request } from '@/plugins/z-request/index.js'
globalThis.Req = request;

globalThis.importScripts(process.env.VUE_APP_RES + '/init-vue2.js').then(res => {
  Vue.use(initZForm)
  // console.log(globalThis.ZY)
  let app = new Vue({
    render: h => h(App),
  }).$mount('#app');
})

