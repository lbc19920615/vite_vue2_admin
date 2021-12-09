<template>
  <div id="app">
<!--    <div>-->
<!--      <el-button @click="loadFile">加载</el-button>-->
<!--      <el-button @click="destory">destory</el-button>-->
<!--    </div>-->
    <div class="page" v-if="page.inited">
      <dym-form :config="page.formConfig">
        <template v-slot:form_afterend="scope">
          {{scope}}
          <el-button @click="submitForm(scope)">提交</el-button>
        </template>
      </dym-form>
    </div>
  </div>
</template>

<script>
import DymForm from "@/zform/DymForm.vue";
import {buildFormDep} from "@/hooks/build";
const STORE_NAME = 'test-vue2';

export default {
  name: 'App',
  components: {
    DymForm,
  },
  data() {

    return {
      page: {
        formConfig: {},
        inited: false
      },
      storeName: STORE_NAME
    }
  },
  beforeMount() {
    this.initPage()
  },
  methods: {
    async initPage() {
      const store_vars = await ZY_EXT.store.getItem(STORE_NAME);
      let formVal = ZY.JSON5.parse(store_vars?.value ?? [])
      let formDef = buildFormDep(formVal, store_vars.name, {
        src: 'comformscr2.twig'
      });
      this.page.formConfig = formDef.init.def
      this.page.inited = true
    },
    async submitForm(scope) {
      let {ctx, partName} = scope;
      let [isValid, errors] = await ctx.submit(partName)
      if (isValid) {
        let model = await ctx.getRawData(partName);
        console.log(model)
      }
    },
    async loadFile() {
      let JSON5 = ZY.JSON5;
      let obj = await ZY_EXT.fileOpenJSON5();
      if (obj.data) {
        try {
          let cloned = JSON5.parse(JSON5.stringify(obj.data));
          // console.log(cloned)
          ZY_EXT.store.setItem(STORE_NAME, cloned)
        } catch (e) {
          console.log('loadFile parse err', e)
        }
      }
    },
    destory() {
      this.page.inited = false
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
