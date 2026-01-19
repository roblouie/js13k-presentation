<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      Overview
    </template>

    <template v-slot:default>
      <div>
      <h1 class="is-size-4"></h1>
      <ul>
        <li>Review low-level computing concepts like bits and bytes, binary and hex, and bit operations</li>
        <li>Explanation of the GameBoy's ram and cartridge, CPU, GPU, and APU, showing concepts and code implementation</li>
        <li>Summary and Showcase</li>

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