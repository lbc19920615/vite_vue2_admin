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
      comName: ''
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
        emit(...args) {
          // console.log(...args)
          if (self.listener[args[0]]) {
            self.listener[args[0]](...args.slice(1))
          }
          self.$emit(...args)
        }
      }
    }
  }
}
</script>