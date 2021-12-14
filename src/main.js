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

import {defZFormFieldCom} from "@/zform/DymFormHooks";

defZFormFieldCom('CusInput', {
  create(propConfig) {
    return {
      template: '<el-input v-model="value" @input="onInput" v-bind="ui.widgetConfig"></el-input>',
      mixins: [

      ],
      data() {
        return {
          value: undefined,
          ui: propConfig.ui,
        }
      }
    }
  }
})

defZFormFieldCom('CusTextarea', {
  create(propConfig) {
    return {
      template: '<el-input v-model="value" @input="onInput" v-bind="ui.widgetConfig"></el-input>',
      mixins: [

      ],
      data() {
        return {
          value: undefined,
          ui: propConfig.ui,
        }
      }
    }
  }
})

defZFormFieldCom('CusRate', {
  create(propConfig) {
    return {
      template: `
        <el-rate
            v-model="value"
            @change="onInput"
            v-bind="ui.widgetConfig"
        >
        </el-rate>`,
      mixins: [

      ],
      data() {
        return {
          value: undefined,
          ui: propConfig.ui,
        }
      }
    }
  }
})

defZFormFieldCom('CusSlider', {
  create(propConfig) {
    return {
      template: `
        <el-slider
            v-model="value"
            @change="onInput"
            v-bind="ui.widgetConfig"
        >
        </el-slider>`,
      mixins: [

      ],
      data() {
        return {
          value: undefined,
          ui: propConfig.ui,
        }
      }
    }
  }
})

defZFormFieldCom('CusDateTimePicker', {
  create(propConfig) {
    // console.log(propConfig)
    return {
      template: `
        <el-date-picker
            type="datetime"
            v-model="value"
            @change="onInput"
            v-bind="ui.widgetConfig"
        >
        </el-date-picker>`,
      data() {
        return {
          value: undefined,
          ui: propConfig.ui,
        }
      }
    }
  }
});

defZFormFieldCom('CusTimePicker', {
  create(propConfig) {
    // console.log(propConfig)
    return {
      template: `
        <el-time-picker
            v-model="value"
            @change="onInput"
            v-bind="ui.widgetConfig"
        >
        </el-time-picker>`,
      mixins: [

      ],
      data() {
        return {
          value: undefined,
          ui: propConfig.ui,
        }
      }
    }
  }
});


defZFormFieldCom('CusCheckbox', {
  create(propConfig) {
    return {
      template: `
        <el-checkbox-group
            v-model="value"
            @change="onInput"
            v-bind="ui.widgetConfig"
        >
        <el-checkbox v-for="(option, key) in buildOptions(ui)"
                     :label="option.label"
                     :value="option.value"
        ></el-checkbox>
        </el-checkbox-group>
      `,
      mixins: [

      ],
      data() {
        return {
          ui: propConfig.ui,
          value: [],
        }
      },
      beforeCreate() {
        console.log(this.value)
      },
      methods: {

      }
    }
  }
})

defZFormFieldCom('CusRadio', {
  create(propConfig) {
    return {
      template: `
        <el-radio-group
            v-model="value"
            @change="onInput"
            v-bind="ui.widgetConfig"
        >
        <el-radio v-for="(option, key) in buildOptions(ui)"
                     :label="option.label"
                     :value="option.value"
        ></el-radio>
        </el-radio-group>
      `,
      mixins: [

      ],
      data() {
        return {
          ui: propConfig.ui,
          value: undefined,
        }
      },
      beforeCreate() {
        console.log(this.value)
      },
      methods: {

      }
    }
  }
})

window.startApp = function () {

  // console.log(globalThis.ZY)
  let app = new Vue({
    render: h => h(App),
  }).$mount('#app');

}
