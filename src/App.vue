<template>
  <div id="app">
    <div>
<!--      <el-button type="primary" @click="loadFile">加载</el-button>-->
<!--      <el-button type="danger" @click="destory">销毁</el-button>-->
    </div>
    <div class="page" v-if="page.inited">
<!--      <form-b :debug="true"  @form-submit="onSubmitForm"></form-b>-->
      <form-loader :name="res.comName" :listener="listener" ></form-loader>
    </div>
  </div>
</template>

<script>
// import FormA from "@/components/form-a.vue";
// import FormLoader from "@/zform/FormLoader";
// import {install} from '@/zform/coms'
import {reqVueFile} from "@/apis/common";

const STORE_NAME = 'test-vue2';



export default {
  name: 'App',
  components: {
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
          self.onSubmitForm(args)
        }
      },
      url:  new URL(location.href),
      storeName: STORE_NAME,
    }
  },
  async beforeMount() {
    // this.initPage()
    console.log(this.url)
    let isStatic = this.url.searchParams.get('static');
    if (isStatic) {
      await this.initPageFromStatic()
    } else {
      await this.initPageFromServer()
    }
  },
  methods: {
    private_getMetas() {
      let url = this.url;
      let activeNo = url
          .searchParams.get('activeNo');
      let tableName = url
          .searchParams.get('tableName')
      return {
        activeNo,
        tableName
      }
    },
    /**
     * 渲染
     * @param vueFileStr
     * @param metas
     * @returns {Promise<void>}
     */
    async private_parse(vueFileStr = '', metas = {}) {
      try {
        this.res = await globalThis.zParseVueComponent({
          template: vueFileStr, metas});
      } catch (e) {
        console.log('parse err',vueFileStr, e)
      }
    },
    /**
     * 从服务器拉取代码
     * @returns {Promise<void>}
     */
    async initPageFromStatic() {
      let metas = this.private_getMetas()

      let res = await import('./static')

      let vueFileStr = ZY.getHereDoc(res.getExampleVue())

      // console.log(vueFileStr)
      await this.private_parse(vueFileStr, metas)
      this.page.inited = true
    },
    /**
     * 从服务器拉取代码
     * @returns {Promise<void>}
     */
    async initPageFromServer() {
      let metas = this.private_getMetas()
      // const store_vars = await ZY_EXT.store.getItem(STORE_NAME);

      // this.page.formConfig = store_vars?.value ?? []
      // let html = document.getElementById('idtpl').innerHTML
      // console.log(html)
      if (!metas.activeNo) {
        console.log('no activeNo', err)
        return;
      }


      let [err, vueFileStr] = await ZY.awaitTo(reqVueFile({
        activeNo: metas.activeNo
      }));
      if (err) {
        console.log('get file failed', err)
        return;
      }
      // console.log(vueFileStr)

      await this.private_parse(vueFileStr, metas)

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
          tableName: metas.tableName,
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
    // destory() {
    //   this.page.inited = false
    // }
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
