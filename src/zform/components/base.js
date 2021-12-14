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

      methods: {

      }
    }
  }
})
