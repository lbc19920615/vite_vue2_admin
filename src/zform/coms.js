import SlotCom from "./SlotCom.vue";
import CmField from "./CmField.vue";
import FormLoader from "./FormLoader.vue";

export {
    SlotCom,
    CmField,
    FormLoader
}

export function install(Vue) {
    Vue.component(SlotCom.name, SlotCom);
    Vue.component(CmField.name, CmField);
    Vue.component(FormLoader.name, FormLoader);
}