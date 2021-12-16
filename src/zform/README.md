# vue2 zform文档



## 依赖

1. @vue/composition-api
2. @/zform/main

### main.js

```javascript
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import {initZForm} from "@/zform/main";
Vue.use(initZForm)
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
