<template>
  <div id="app">
    <div>
<!--      <el-button type="primary" @click="loadFile">加载</el-button>-->
      <el-button type="danger" @click="destory">销毁</el-button>
    </div>
    <div class="page" v-if="page.inited">
<!--      <form-b :debug="true"  @form-submit="onSubmitForm"></form-b>-->
      <form-loader :name="res.comName" :listener="listener" @form-submit="onSubmitForm"></form-loader>
    </div>
  </div>
</template>

<script>
// import FormA from "@/components/form-a.vue";
import FormLoader from "@/zform/FormLoader";
const STORE_NAME = 'test-vue2';




export default {
  name: 'App',
  components: {
    FormLoader
    // FormA


  },
  data() {
    let self = this
    return {
      page: {
        formConfig: {},
        inited: false
      },
      res: {},
      listener: {
        ['form-submit']: function (args) {
          console.log(self, args)
        }
      },
      storeName: STORE_NAME
    }
  },
  async beforeMount() {
    this.initPage()
    // let h = document.getElementById('idtpl').innerHTML;
    //
    // let id = 'fun__' + ZY.rid();
    // let script = document.createElement('script');
    // script.type = 'module';
    // script.innerHTML = `let callback = '${id}';` + h;
    // document.body.append(script)
    // globalThis[id] = function ({def}) {
    //   console.log(def)
    //   globalThis.Vue.component('form-b', def);
    //   self.page.inited = true
    // }
    // this.page.inited = true
  },
  methods: {
    async initPage() {
      // const store_vars = await ZY_EXT.store.getItem(STORE_NAME);

      // this.page.formConfig = store_vars?.value ?? []
      let html = document.getElementById('idtpl').innerHTML
      // console.log(html)
      this.res = await globalThis.zParseVueComponent({template: html});

      this.page.inited = true
    },
    async onSubmitForm({scope}) {
      let {ctx, partName} = scope;
      let [isValid, errors] = await ctx.submit(partName)
      if (isValid) {
        let model = await ctx.getRawData(partName);
        let metas = ctx.getMetas();
        // console.log(model, metas)
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
