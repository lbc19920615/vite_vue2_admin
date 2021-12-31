<template>
  <div class="z-grid-item" :style="styleObj"><slot></slot></div>
</template>

<script>
import {ZGridMixin} from "./ZGridMixin";

export default {
  name: 'ZGridItem',
  mixins: [
    ZGridMixin
  ],
  inject: ['ZGridIns'],
  created() {
    // console.log(this.ZGridIns)
    this.ZGridIns.register(this)
  },
  data() {
    return {
      styleObj: {
        // width: `calc(3 / 24 * 100%)`
      }
    }
  }
}
</script>
