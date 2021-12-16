import Vue from 'vue/dist/vue.esm'
import App from './App.vue'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.config.productionTip = false

globalThis.Vue = Vue


import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import  { initZForm } from '@/zform/init';
Vue.use(initZForm);

import { request } from '@/plugins/z-request/index.js'
globalThis.Req = request;



let app = new Vue({
  render: h => h(App),
}).$mount('#app');
