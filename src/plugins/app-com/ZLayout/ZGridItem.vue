<template>
  <div class="z-grid-item"><slot></slot></div>
</template>

<script>
import {ZGridMixin} from "./ZGridMixin";

export default {
  name: 'ZGridItem',
  mixins: [
    ZGridMixin
  ]
}
</script>
