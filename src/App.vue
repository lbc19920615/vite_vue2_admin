<template>
  <div id="app">
    <div>
<!--      <el-button type="primary" @click="loadFile">加载</el-button>-->
      <el-button type="danger" @click="destory">销毁</el-button>
    </div>
    <div class="page" v-if="page.inited">
      <form-a :debug="true"  @form-submit="onSubmitForm"></form-a>
    </div>
  </div>
</template>

<script>
import FormA from "@/components/form-a.vue";
const STORE_NAME = 'test-vue2';

export default {
  name: 'App',
  components: {
    FormA


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
      // const store_vars = await ZY_EXT.store.getItem(STORE_NAME);

      // this.page.formConfig = store_vars?.value ?? []
      this.page.inited = true
    },
    async onSubmitForm({scope}) {
      let {ctx, partName} = scope;
      let [isValid, errors] = await ctx.submit(partName)
      if (isValid) {
        let model = await ctx.getRawData(partName);
        let metas = ctx.getMetas();
        console.log(model, metas)
        globalThis.Req.post('/api/zy-boot/json/addJson', {
          tableName: metas.form_data,
          model: model
        })
      }
    },
    // async loadFile() {
    //   let JSON5 = ZY.JSON5;
    //   let obj = await ZY_EXT.fileOpenJSON5();
    //   if (obj.data) {
    //     try {
    //       let cloned = JSON5.parse(JSON5.stringify(obj.data));
    //       // console.log(cloned)
    //       await ZY_EXT.store.setItem(STORE_NAME, cloned);
    //       location.reload();
    //     } catch (e) {
    //       console.log('loadFile parse err', e)
    //     }
    //   }
    // },
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
