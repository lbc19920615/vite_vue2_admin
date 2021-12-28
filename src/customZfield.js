import {defZFormFieldCom} from "@/zform/render";

import ZCusCom from "@/plugins/app-com/ZCusCom.vue";

defZFormFieldCom('CusCom', {
  create(propConfig) {
    return {
      template: `
      <div style="display: flex; align-items: center; gap: 10px;">
        <div>这是自定义的组件</div>
        <div>
          <el-input
              v-model="value"
              @change="zfield__onInput"
              v-bind="ui.widgetConfig"
          >        </el-input>
        </div>
        <div>CusCom</div>
      </div>
      `,
      data() {
        return {
          value: undefined,
          ui: propConfig.ui,
        }
      }
    }
  }
});

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


defZFormFieldCom('CusAddress', {
  create(propConfig) {
    return {
      template: `
        <div>
<!--        {{ui}}-->
          <china-area
              v-bind="ui.widgetConfig"
          ></china-area>
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
