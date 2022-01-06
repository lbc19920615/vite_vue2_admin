let __zFormCachedVue__;
let zFormMetas = new Map();

export function registerCachedVue(Vue) {
  __zFormCachedVue__ = Vue;
}

export function getCachedVue() {
  return __zFormCachedVue__
}


export function getZFormMeta(instanse) {
  let appName;
  if (instanse && instanse.appContext && instanse.appContext.app) {
    appName = instanse.appContext.app.config.globalProperties.name
  } else {
    appName = __zFormCachedVue__.name;
  }
  if (appName) {
    return zFormMetas.get(appName)
  }
}

export function setZFormMeta(key, value) {
  zFormMetas.set(key, value)
}

let zFormInsMap = new Map();

/**
 *
 * @param key
 * @param value
 */
export function setZFormInsMap(key, value) {
  zFormInsMap.set(key, value)
}

