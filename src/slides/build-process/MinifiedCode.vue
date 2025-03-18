<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Build Process
    </template>

    <template v-slot:default>
      <div class="is-flex-grow-1 is-flex flex-column is-justify-content-center is-align-items-center">

        <img src="./minified-code.png" />
      </div>
      <p>Minified code from Charon Jr, 2022 entry</p>
      <p>Minifiers won't minify certain reserved words used by the browser.</p>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  font-size: 1.7em;
  padding: 0 2em;
}

img {
  height: 14em;
}

li {
  margin-bottom: 1em;
}
</style>