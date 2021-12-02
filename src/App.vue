<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App">
      <template v-slot:form_afterend="scope">
        {{scope}}
        <el-button @click="submitForm(scope)">提交</el-button>
      </template>
    </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    async submitForm(scope) {
      let {ctx, partName} = scope;
      let model = await ctx.getRawData(partName);
      console.log(model)
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
