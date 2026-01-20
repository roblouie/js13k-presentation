<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      Binary Operations
    </template>

    <template v-slot:default>
      <div>
      <h1 class="is-size-4"></h1>
      <ul>
        <li><b class="has-text-white">&</b> - Binary AND operation, allows clearing or keeping bits from a larger value.</li>
        <li><b class="has-text-white">|</b> - Binary OR operation, allows setting individual bits in a larger value.</li>
        <li><b class="has-text-white"><< >></b> - Binary SHIFT operation, shifts bit position. Since each position is a power of 2,
        has the effect of doubling (<<) or halving (>>) a value. Also allows removing lower bits while shifting values down.</li>

      </ul>
      </div>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  list-style: disclosure-closed;
  margin: 1em;
  font-size: 1.5em;
}

li {
  margin-bottom: 0.5em;
}
</style>