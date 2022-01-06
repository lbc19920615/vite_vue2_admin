<template>
  <div class="form-loader">
    <component :is="comName"></component>
  </div>
</template>

<script>
export default {
  name: 'FormLoader',
  props: {
    name: String,
    listener: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      comName: '',
      curIns: {}
    }
  },
  watch: {
    name: {
      handler(v) {
        this.comName = v
      },
      immediate: true
    }
  },
  provide() {
    let self = this;
    return {
      zformLoader: {
        registerCur(ctx) {
          self.curIns = ctx
        },
        emit(...args) {
          // console.log(...args)
          if (self.listener[args[0]]) {
            self.listener[args[0]](...args.slice(1))
          }
          self.$emit(...args)
        }
      }
    }
  },
  methods: {
    getCurForm() {
      if (this.curIns) {
        return this.curIns.exportCtx
      }
      return null
    }
  }
}
</script>
