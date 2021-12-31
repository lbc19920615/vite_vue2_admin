<template>
  <div class="z-grid"><slot></slot></div>
</template>

<script>
import {ZGridMixin} from "./ZGridMixin";

export default {
  name: 'ZGrid',
  mixins: [
      ZGridMixin
  ],
  mounted() {
    // console.log(this.map)
    console.log(this.zgrid__getMeta(this.uuid))
  },
  data() {
    return {
      map: new Map()
    }
  },
  provide() {
    let map = this.map
    let self = this
    return {
      ZGridIns: {
        uuid: this.uuid,
        register(ctx) {
          map.set(ctx.uuid, ctx)
          self.zgrid__registerItem(self.uuid, self.map)
          // console.log(map)
        }
      }
    }
  }
}
</script>
