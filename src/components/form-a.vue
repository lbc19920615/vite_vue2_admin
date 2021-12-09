<template>
  <dym-form v-if="inited" :debug="debug" :config="formDef">
    <template v-slot:form_afterend="scope">
      <!--          {{scope}}-->
      <el-button type="primary" @click="callEvent('submit-form', scope, $event)">提交</el-button>
    </template>
  </dym-form>
</template>

<script>
import DymForm from "@/zform/DymForm.vue";
import {buildFormDep} from "@/zform/hooks/build";

export default {
  name: 'formA',
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
</script>
