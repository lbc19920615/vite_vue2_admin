<template>
  <div id="app">
    <div>
      <el-button @click="loadFile">加载</el-button>
      <el-button @click="destory">destory</el-button>
    </div>
    <div class="page" v-if="page.inited">
      <dym-form :store-name="storeName">
        <template v-slot:form_afterend="scope">
          {{scope}}
          <el-button @click="submitForm(scope)">提交</el-button>
        </template>
      </dym-form>
    </div>
  </div>
</template>

<script>
import DymForm from "@/components/DymForm.vue";
const STORE_NAME = 'test-vue2';

export default {
  name: 'App',
  components: {
    DymForm,
  },
  data() {
    return {
      page: {
        inited: true
      },
      storeName: STORE_NAME
    }
  },
  methods: {
    async submitForm(scope) {
      let {ctx, partName} = scope;
      let model = await ctx.getRawData(partName);
      console.log(model)
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
