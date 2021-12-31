/**
 * ZGridMixin
 * @type {{props: {bind: {default(): {}, type: ObjectConstructor}}}}
 */
export let ZGridMixin = {
  props: {
    binds: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
