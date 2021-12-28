/**
 * initChinaAreaManagerFromObj
 * @param obj
 */
function initChinaAreaManagerFromObj(obj= {}) {
    // let obj = {}
    let manager = {}
    // try {
    //     obj = ZY.JSON5.parse(str)
    // } catch (e) {
    //     console.log(e)
    // }
    manager.obj = obj
    manager.get = function (path, defaultVal) {
        return ZY.lodash.get(obj, path, defaultVal)
    }
    return manager
}

import chinaArea from "@/plugins/chinaArea/chinaArea.vue";

export function install(Vue) {
    import('./area.js').then(res => {
        // console.log(res)
        globalThis.chinaAreaManager =
          initChinaAreaManagerFromObj(res.default);
        Vue.component(chinaArea.name, chinaArea)
    });
}
