<template>
  <div class="z-grid"><slot></slot></div>
</template>

<script>
import {ZGridMixin} from "./ZGridMixin";

export default {
  name: 'ZGrid',
  mixins: [
      ZGridMixin
  ]
}
</script>
