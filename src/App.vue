<template>
  <div id="app">
    <div>
<!--      <el-button type="primary" @click="loadFile">加载</el-button>-->
      <el-button type="danger" @click="destory">销毁</el-button>
    </div>
    <div class="page" v-if="page.inited">
      <form-b :debug="true"  @form-submit="onSubmitForm"></form-b>

    </div>
  </div>
</template>

<script>
// import FormA from "@/components/form-a.vue";
const STORE_NAME = 'test-vue2';

let templateSfc = function (sfc) {
  if (sfc.template) {
    return sfc.template.content
  }
  return ''
}
async function fetchTwigComponent(comName = '', {handleScript, styles = [], cached_tpl = '' } = {}) {
  try {
    // console.log('this.formDef', this.formDef)
    // console.log(def)
    // let data = new FormData()
    // data.append('source', JSON.stringify(def))
    let tpl = cached_tpl;
    // console.log('cached_tpl', cached_tpl)
    let sfc = ZY_EXT.parseComponent(tpl)
    const templateId = comName + '-tpl';
    // console.log(sfc)
    let styleSheets = []
    if (Array.isArray(sfc.styles) && sfc.styles.length > 0) {
      styles = styles.concat(sfc.styles)
    }

    styles.forEach(styleObj => {
      let styleDom = document.createElement('style')
      styleDom.id = ZY.nid()
      styleDom.innerText = styleObj.content
      document.body.appendChild(styleDom)
      styleSheets.push(styleDom)
    })
    let scriptStr = sfc.script.content
    if (handleScript) {
      scriptStr = handleScript(scriptStr)
    }
    let res = await ZY.importJsStr(scriptStr)
    ZY.DOM.initTemplate(templateId, globalThis.document, {
      html: `${templateSfc(sfc)}`,
    });
    return {
      script: res,
      sfc,
      templateId,
      name: comName,
    }
  } catch (e) {
    console.error(e)
  } finally {
    //
  }
}



export default {
  name: 'App',
  components: {
    // FormA


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
  async beforeMount() {
    // this.initPage()
    let self = this;
    let h = document.getElementById('idtpl').innerHTML;

    let id = 'fun__' + ZY.rid();
    let script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `let callback = '${id}';` + h;
    document.body.append(script)
    globalThis[id] = function ({def}) {
      console.log(def)
      globalThis.Vue.component('form-b', def);
      self.page.inited = true
    }
    // this.page.inited = true
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
