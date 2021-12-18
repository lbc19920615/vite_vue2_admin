<script>
import { createRefManager } from "./hooks/ref";

export default  {
  name: 'SlotCom',
  props: {
    defs: null,
    attrs: {
      type: Object,
      default() {
        return {}
      }
    },
    name: {
      type: String,
      default: "default"
    },
    binds:{
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props, ctx) {
    const {provide, h} = globalThis.vueCompositionAPI;
    // let curFormCon = inject('curFormCon')
    // provide('curFormCon', curFormCon)
    let RefsManager = createRefManager({
      eventHandler({type, e}) {
        ctx.emit('fires', {type, e})
        // console.log('slot-com', type, e)
      }
    })
    RefsManager.attrs = props.attrs
    provide('slotComRefManager', RefsManager)
    let slotContents = []
    if (props.defs && ZY.lodash.isFunction(props.defs[props.name])) {
      // console.log('sdsdsds', props.binds)
      slotContents = props.defs[props.name](props.binds)
    }
    // console.log(props.name, slotContents)
    return () => {
      // console.log(slotContents)
      return h('div', {}, slotContents)
      // return slotContents
    }
  }
}
</script>
