<template>
  <div class="z-grid-item"><slot></slot></div>
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
  }
}
</script>
