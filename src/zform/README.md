# vue2 zform文档



## 依赖

1. @vue/composition-api
2. @/zform/main

### index.html

```html
  <script src="<%= process.env.VUE_APP_RES %>/twig.min.js"></script>
<script src="<%= process.env.VUE_APP_RES %>/init2.js"></script>
```

### main.js

```javascript
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import {initZForm} from "@/zform/main";
Vue.use(initZForm)

globalThis.importScripts(process.env.VUE_APP_RES + '/init-vue2.js').then(res => {
  Vue.use(initZForm);
//  实例化app
  let app = new Vue({
    render: h => h(App),
  }).$mount('#app');
});
```

### 页面调用

```html
<form-a 
        :debug="true"  
        @event-name1="handleEvent1"
        @event-name2="handleEvent2"
></form-a>
```

## zform

### props

```javascript
/**
* 调试开关
*/
debug: {
  type: Boolean
}
``` 

## 二次开发

### 预制方法

zfield__ 前缀的不可以重写

```typescript
/**
 * 用于触发更新
 */
function zfield__onInput(newVal: any):void {}
```

### 开发自己的组件

```javascript
import {defZFormFieldCom} from "@/zform/DymFormHooks";

defZFormFieldCom('CusInput', {
  /**
   * @param propConfig {{ ui: { label: '', widget: '', widgetConfig: {} }, rules: [] }}
   */
  create(propConfig) {
    return {
      template: '<el-input v-model="value" @input="zfield__onInput" v-bind="ui.widgetConfig"></el-input>',
      mixins: [

      ],
      data() {
        return {
          /**
           * 必须设置这个字段
           */
          value: undefined,
          ui: propConfig.ui,
        }
      }
    }
  }
})
```
