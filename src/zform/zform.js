import DymForm from "./DymForm.vue";
// import {buildFormDep} from "@/zform/hooks/build";

/**
 * 创建formCommon mixin
 * @param formDef {{}}
 * @param formMetas {{}}
 */
export let createZformCommon = function ({formDef, formMetas}) {
  // console.log(formDef)
  let partName = formDef.name
  return {
    components: {DymForm},
    props: {
      // config: String,
      /**
       * 调试开关
       */
      debug: {
        type: Boolean
      }
    },
    inject: ['zformLoader'],
    data() {
      return {
        formMetas,
        inited: false,
        partName,
        formDef: {
          parts: [
            formDef
          ]
        }
      }
    },
    // watch: {
    //   config: {
    //     handler(newVal) {
    //       if (newVal) {
    //         console.log(newVal)
    //         let formVal = ZY.JSON5.parse(newVal ?? []);
    //         let formDef = buildFormDep(formVal, formVal.name, {
    //         });
    //         if (formDef?.init?.def) {
    //           console.log(formDef.init.def)
    //           // this.inited = false
    //           // this.formDef = formDef.init.def
    //           // this.$nextTick(() => {
    //           //   this.inited = true
    //           // })
    //         }
    //         // console.log(formDef)
    //       }
    //
    //     },
    //     immediate: true
    //   }
    // },
    mounted() {
      this.inited = true
    },
    methods: {
      callEvent(name, scope, e) {
        // console.log(this.zformLoader)
        this.zformLoader.emit(name, {
          scope,
          e
        })
      }
    }
  }
}
