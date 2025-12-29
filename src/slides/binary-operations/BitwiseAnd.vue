<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Bitwise & (AND)
    </template>

    <template v-slot:default>
      <div class="is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-center is-align-items-center">

<pre class="is-size-2">
    0010110
  & 1011011</pre>

        <pre class="is-size-2" contenteditable="true">  </pre>

        <p class="mt-6">0 is false, 1 is true. Works just like &&, but per bit</p>

      </div>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
pre {
  width: 8em;
  text-align: right;
}
</style>