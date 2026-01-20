<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      CPU Every Frame (16.66 ms)
    </template>

    <template v-slot:default>
      <div>
      <h1 class="is-size-4"></h1>
      <ul>
        <li>Execute between 15,000 - 20,000 instructions, performing thousands of calculations, and reading and writing thousands of bytes to and from ram</li>
      </ul>
      </div>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  list-style: disclosure-closed;
  margin: 1em;
  font-size: 2em;
}

li {
  margin-bottom: 0.5em;
}
</style>