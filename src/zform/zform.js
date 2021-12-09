import DymForm from "@/zform/DymForm";
import {buildFormDep} from "@/zform/hooks/build";

export let zformCommon = {
  components: {DymForm},
  props: {
    config: String,
    debug: {
      type: Boolean,
      // default: true
    }
  },
  data() {
    return {
      inited: false,
      formDef: {}
    }
  },
  watch: {
    config: {
      handler(newVal) {
        if (newVal) {
          let formVal = ZY.JSON5.parse(newVal ?? []);
          let formDef = buildFormDep(formVal, formVal.name, {
          });
          if (formDef?.init?.def) {
            this.inited = false
            this.formDef = formDef.init.def
            this.$nextTick(() => {
              this.inited = true
            })
          }
          // console.log(formDef)
        }

      },
      immediate: true
    }
  },
  methods: {
    callEvent(name, scope, e) {
      this.$emit(name, {
        scope,
        e
      })
    }
  }
}
