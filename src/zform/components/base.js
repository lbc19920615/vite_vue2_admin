import {defZFormFieldCom} from "@/zform/DymFormHooks";

defZFormFieldCom('CusInput', {
  create(propConfig) {
    return {
      template: '<el-input v-model="value" @input="zfield__onInput" v-bind="ui.widgetConfig"></el-input>',
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

defZFormFieldCom('CusInputNumber', {
  create(propConfig) {
    return {
      template: '<el-input type="number" v-model.number="value" ' +
        '@input="onInputNumber" v-bind="ui.widgetConfig"></el-input>',
      mixins: [

      ],
      data() {
        return {
          value: undefined,
          ui: propConfig.ui,
        }
      },
      methods:{
        onInputNumber(e) {
          let v = parseFloat(e);
          if (Number.isNaN(v)) {
            this.zfield__onInput('')
          }
          this.zfield__onInput(v)
        }
      }
    }
  }
})

defZFormFieldCom('CusTextarea', {
  create(propConfig) {
    return {
      template: '<el-input v-model="value" @input="zfield__onInput" v-bind="ui.widgetConfig"></el-input>',
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
            @change="zfield__onInput"
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
            @change="zfield__onInput"
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
            @change="zfield__onInput"
            v-bind="ui.widgetConfig"
        >
        </el-date-picker>`,
      data() {
        let w = propConfig.ui.widgetConfig;
        w.valueFormat = 'yyyy-MM-dd HH:mm:ss'
        // console.log(w)
        return {
          widgetConfig: w,
          value: undefined,
          ui: propConfig.ui,
        }
      },
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
            @change="zfield__onInput"
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
            @change="zfield__onInput"
            v-bind="ui.widgetConfig"
        >
        <el-checkbox v-for="(option, key) in zfeild__buildOptions(ui)"
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
      // beforeCreate() {
      //   console.log(this.value)
      // },
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
            @change="zfield__onInput"
            v-bind="ui.widgetConfig"
        >
        <el-radio v-for="(option, key) in zfeild__buildOptions(ui)"
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

      methods: {

      }
    }
  }
});

defZFormFieldCom('CusSelect', {
  create(propConfig) {
    return {
      template: `
        <el-select
            v-model="value"
            @change="zfield__onInput"
            v-bind="ui.widgetConfig"
        >
        <el-option v-for="(option, key) in zfeild__buildOptions(ui)"
                     :label="option.label"
                     :value="option.value"
        ></el-option>
        </el-select>
      `,
      mixins: [

      ],
      data() {
        return {
          ui: propConfig.ui,
          value: undefined,
        }
      },

      methods: {

      }
    }
  }
});
