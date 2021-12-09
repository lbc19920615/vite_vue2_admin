<template>
  <dym-form v-if="inited" :debug="debug" :config="formDef">
    <template v-slot:form_afterend="scope">
      <!--          {{scope}}-->
      <el-button type="primary" @click="callEvent('submit-form', scope, $event)">提交</el-button>
    </template>
  </dym-form>
</template>

<script>
import {zformCommon} from "@/zform/zform";

export default {
  name: 'formA',
  mixins: [
    zformCommon
  ]
}
</script>
