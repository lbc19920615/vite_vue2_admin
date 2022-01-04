let staticTpls = {
  sub() {
    /*
<template>
<dym-form v-if="inited" :debug="debug" :metas="formMetas" :config="formDef">

</dym-form>
</template>
<script>
const formComName = 'test111';
const formTemplate = '#[[TPL_ID]]';
const formDef = {type:'form',name:'form_DJZHVx',serviceTpl:{def:{},args:{src:'bservice.twig'}},def:{type:'object',ui:{attrs:[['prop1','11']],class:['class1'],styleSheets:[]},properties:{field__GSM8XzbSEH:{type:'string',INIT_CONFIG:{type:'string'},ui:{widget:'CusInput',label:'多行文本',widgetConfig:{type:'textarea'}},computedFun:'',rules:[],server:{field_name:'field__GSM8XzbSEH'},rules_json:'[]'},subform__k5am3cH13j:{type:'object',properties:{field__yRFpGDHbmO:{type:'string',INIT_CONFIG:{type:'string'},ui:{widget:'CusInput',label:'多行文本',widgetConfig:{type:'textarea'}},server:{field_name:'field__yRFpGDHbmO'}}}}},metas:{form_data:'json_a4b58'}},computed:{}};
const formMetas =[[metas]];
let zformCommon = globalThis.createZformCommon({formDef, formComName, formMetas});
let def = {
    template: formTemplate,
    mixins: [
        zformCommon
    ]
}
globalThis[callback]({comName: formComName, def});
</script>
  */
  }
}

/**
 * 获取测试文件
 * @param staticFlg
 * @returns {(function())|*}
 */
export function getExampleVue(staticFlg = '') {
  let keys = Object.keys(staticTpls)
  if (keys.includes(staticFlg)) {
      return staticTpls[staticFlg]
  }
  return function () {/*
<template>
<dym-form v-if="inited" :debug="debug" :metas="formMetas" :config="formDef">

</dym-form>
</template>
<script>
const formComName = 'formc';
const formTemplate = '#[[TPL_ID]]';
const formDef = {type:'form',name:'form_iPxz_E',serviceTpl:{def:{},args:{src:'bservice.twig'}},def:{type:'object',ui:{},properties:{field__SZtgvBrSkQ:{type:'string',INIT_CONFIG:{type:'string'},ui:{widget:'CusInput',label:'多行文本',widgetConfig:{type:'textarea'}},computedFun:'',rules:[],server:{field_name:'field__SZtgvBrSkQ'},rules_json:'[]'},field__gvCEIm6WdQ:{type:'string',wrap:'z-grid-item',wrap_config:{},ui:{label:'单行文本',widgetConfig:{},widget:'CusInput'},computedFun:'',rules:[],server:{field_name:'field__gvCEIm6WdQ'},rules_json:'[]',wrap_start_tag:'z-grid',wrap_start_ui_config:{widgetConfig:{control:"{flow:'',layouts:[{id:'P45NDqTjavtCXSDc2Ybfy',label:'jg_6rz',value:7},{id:'ICZiAXqsKFaLkuOdaiXkk',label:'w0XZEU',value:10},{id:'i4KH_ddUr4a5oDO0ciwYE',label:'ARmpcy',value:7}]}"}}},field__JHCb9rNtum:{type:'string',wrap:'z-grid-item',wrap_config:{},ui:{label:'单行文本',widgetConfig:{},widget:'CusInput'},server:{field_name:'field__JHCb9rNtum'}},field__J3u8a4IcTs:{type:'string',wrap:'z-grid-item',wrap_config:{},ui:{label:'单选',widgetConfig:{options2:"[{label:'选项1',value:'radio1'},{label:'选项2',value:'radio2'}]"},widget:'CusRadio'},computedFun:'',rules:[],server:{field_name:'field__J3u8a4IcTs'},rules_json:'[]',wrap_end_tag:'z-grid'}},metas:{form_data:{tableName:'json_4e726',activeNo:'At202112274554'}}},computed:{}};
const formMetas =[[metas]];
let zformCommon = globalThis.createZformCommon({formDef, formComName, formMetas});
let def = {
    template: formTemplate,
    mixins: [
        zformCommon
    ]
}
globalThis[callback]({comName: formComName, def});
</script>
  */}
}
