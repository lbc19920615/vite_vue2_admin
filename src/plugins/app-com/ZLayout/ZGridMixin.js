let gridMetas = new Map();

/**
 * ZGridMixin
 * @type {{props: {bind: {default(): {}, type: ObjectConstructor}}}}
 */
export let ZGridMixin = {
  props: {
    fieldKey: String,
    binds: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    let config = this.binds?.config ?? {}
    let gridControlConfig = {}
    let control_str = config?.wrap_start_ui_config?.widgetConfig?.control
    if (control_str) {
      gridControlConfig = ZY.JSON5.parse(control_str)
    }
    // console.log(gridControlConfig)
    let uuid = ZY.rid()
    return {
      config,
      gridControlConfig,
      uuid,
    }
  },
  created() {
    gridMetas.set(this.uuid, {
      items: new Map()
    })
  },
  methods: {
    /**
     *
     * @param gridUUID
     * @param items
     */
    zgrid__registerItem(gridUUID, items) {
      let meta = gridMetas.get(gridUUID)
      if (!meta) {
        meta = {
          items: new Map()
        }
      }
      meta.items = items
    },
    zgrid__getMeta(gridUUID) {
      return gridMetas.get(gridUUID)
    }
  }
}
