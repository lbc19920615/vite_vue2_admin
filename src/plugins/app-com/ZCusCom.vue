<template>
  <div style="display: flex; align-items: center; gap: 10px;">
    <div>这是自定义的组件</div>
    <div>
      <el-input
          v-model="innerValue"
          @input="change"
          v-bind="inputConfig"
      >        </el-input>
    </div>
    <div>CusCom</div>
  </div>
</template>

<script>
export default {
  name: 'ZCusCom',
  props: {
    inputConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    value: null
  },
  data() {
    return {
      innerValue: this.value
    }
  },
  methods: {
    change(e) {
      this.$emit('val-change', e)
    }
  }
}
</script>
