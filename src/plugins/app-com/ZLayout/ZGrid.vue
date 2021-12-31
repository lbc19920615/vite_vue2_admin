<template>
  <div class="z-grid" :class="[cls]"><slot></slot></div>
</template>

<script>
import {ZGridMixin} from "./ZGridMixin";

export default {
  name: 'ZGrid',
  mixins: [
      ZGridMixin
  ],
  created() {
    // console.log(this.fieldKey)
    // console.log(this.zgrid__getMeta(this.uuid))
    // console.log(this.gridControlConfig)
    let clv = 'z-grid-' + (this.fieldKey ??  ZY.rid(6))
    let cls = '.' + clv
    let cssv = {
      [cls]: {
        display: 'flex'
      },
    }
    this.cssobj = ZY_EXT.cssobj(cssv)
    this.cls = clv
    this.cssv = cssv

    this.private_updateLayouts()

  },
  data() {

    return {
      cssobj: null,
      map: new Map(),
      cls: '',
      cssv: {},
      columnTotal: 24
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
  },
  methods: {
    private_updateLayouts() {
      let cssv = this.cssv
      let cls = this.cls
      let layoutValues = this.gridControlConfig.layouts.map(v =>v.value)
      layoutValues.forEach((layoutValue, index) => {
        cssv[`.${cls} > .z-grid-item:nth-child(${index + 1})`] = {
          width: `calc(${layoutValue} / ${this.columnTotal} * 100%)`
        }
      })
      // console.log(cssv)
      // this.cssobj = ZY_EXT.cssobj(cssv)
      this.cssobj.update()
    }
  }
}
</script>
