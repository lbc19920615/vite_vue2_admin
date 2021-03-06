# vue2 zform文档

## 依赖

1. @vue/composition-api
2. @/zform/main
3. 使用vue/dist/vue.esm版本 2.6x

### index.html

```html

<script src="<%= process.env.VUE_APP_RES %>/twig.min.js"></script>
<script src="<%= process.env.VUE_APP_RES %>/init2.js"></script>
<!-- 可选 -->
<script src="<%= process.env.VUE_APP_RES %>/webcomponentsjs/webcomponents-loader.js"></script>
<script async src="<%= process.env.VUE_APP_RES %>/es-module-shims.js"></script>
```

### main.js

```javascript
// vue2.6.x
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import  { initZForm } from '@/zform/init';
// vue2 app 是Vue          vue3 app 是Vue.createApp()
initZForm(App, Vue)
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
import {defZFormFieldCom} from "[path]/zform/lib";

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

### 可以使用自定义vue

```javascript
import ZCusCom from "@/plugins/app-com/ZCusCom.vue";

// 使用自定义组件
defZFormFieldCom('CusCom2', {
  create(propConfig) {
    return {
      template: `
        <div>
        <div>{{value}}</div>
        <z-cus-com @val-change="onInput" :value="value"></z-cus-com>
        </div>
      `,
      components: {
        ZCusCom
      },
      data() {
        return {
          value: undefined,
          ui: propConfig.ui,
        }
      },
      methods: {

        onInput(v) {
          this.value = v
          this.zfield__onInput(v)
        }
      }
    }
  }
});
```
