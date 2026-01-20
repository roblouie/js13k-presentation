<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      CPU Registers
    </template>

    <template v-slot:default>
      <div>
      <h1 class="is-size-3"></h1>
      <ul>
        <li><b class="has-text-white">Program Counter</b> - 16-bit value that points to memory address of commands</li>
        <li><b class="has-text-white">Stack Pointer</b> - 16-bit value that points to the start of the stack</li>
        <li><b class="has-text-white">A</b> - 8-bit accumulator, stores the result of arithmetic</li>
        <li><b class="has-text-white">B, C, D, E, H, L</b> - 8-bit auxiliary registers for A</li>
        <li><b class="has-text-white">F</b> - Contains four flags maintained by the CPU</li>
      </ul>
      </div>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  list-style: disclosure-closed;
  margin: 1em;
  font-size: 1.8em;
}

li {
  margin-bottom: 0.5em;
}
</style>