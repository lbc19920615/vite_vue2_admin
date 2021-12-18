// import {inject, onBeforeUnmount, onMounted, provide} from "@vue/composition-api";

export function createRefManager({eventHandler}) {
  // const {inject, onBeforeUnmount, onMounted, provide} = globalThis.vueCompositionAPI
  let RefsManager = {
    Refs: new Map(),
  }
  /**
   * register
   * @param context
   * @param uuid
   * @returns {{emit: {<T=any>(type: EventType, event?: T): void, (type: "*", event?: any): void}, uuid: *}}
   */
  RefsManager.register = function (context, uuid = ZY.nid(), append = {}) {
    const emitter = globalThis.ZY_EXT.mitt()
    emitter.on('*', (type, e) => {
      // console.log(type, e)
      if (eventHandler) {
        eventHandler({
          type,
          e
        })
      }
    })

    let obj = {
      uuid,
      context,
      destoryed: false,
      event: emitter,
      append
    }
    RefsManager.Refs.set(uuid, obj)
    return {
      uuid,
      emit: emitter.emit
    }
  }
  /**
   * destory
   * @param uuid {string}
   */
  RefsManager.destory = function (uuid) {
    if ( RefsManager.Refs.has(uuid)) {
      let obj =  RefsManager.Refs.get(uuid)
      obj.destoryed = true
      RefsManager.Refs.set(uuid, obj)
    }
  }
  /**
   * find
   * @param name
   * @returns {null|*}
   */
  RefsManager.find = function (name) {
    if (this.Refs.has(name)) {
      let obj = this.Refs.get(name)
      return obj.context
    }
    return null
  }

  /**
   *
   * @param name
   * @param methodName
   * @param args
   * @returns {boolean}
   */
  RefsManager.runCom = function (name, methodName, ...args) {
    let _com = RefsManager.find(name)
    if (!_com) {
      return false
    }
    if (!_com[methodName]) {
      return false
    }
    _com[methodName](...args)
    return true
  }
  return RefsManager
}

/**
 * provideRefManager
 * @param name
 * @param eventHandler
 * @returns {{Refs: Map<any, any>}}
 */
// export function provideRefManager( {name = 'RefsManager', eventHandler} = {}) {
//   let RefsManager = createRefManager({eventHandler})
//   provide(name, RefsManager)
//   return RefsManager
// }

/**
 * useRefsManager
 * @param ret
 * @param catchMOunted
 * @param catchUnMOunted
 * @param append
 */
// export function useRefsManager(ret, [catchMOunted, catchUnMOunted], append ) {
//   let def = {}
//   let RefsManager = inject('RefsManager')
//   onMounted(() => {
//     // console.log(RefsManager)
//     def = RefsManager.register(ret, ret.uuid, append)
//     if (catchMOunted) {
//       catchMOunted(def)
//     }
//   })
//   onBeforeUnmount(() => {
//     RefsManager.destory(def.uuid)
//     if (catchUnMOunted) {
//       catchUnMOunted()
//     }
//   })
// }
