<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Roadroller
    </template>

    <template v-slot:default>
      <div>
        <p class="mb-6">Advanced compression, based of compressor used in demoscene graphics apps</p>
        <p class="mb-6">Much better compression than zip, and generates self decompressing code</p>
        <p>When the game is zipped, the actual game code doesn't get smaller, only the Roadroller decompression code is compressed</p>
      </div>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
p {
  font-size: 1.8em;
}
</style>