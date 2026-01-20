<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      CPU Overview
    </template>

    <template v-slot:default>
      <div>
      <h1 class="is-size-4"></h1>
      <ul>
        <li>Use the Program Counter as an index into memory to lookup an instruction and run it</li>
        <li>Implement the logic of all instructions, including reading and writing memory, performing
        logic in registers, updating the Program Counter, and maintaining the Stack</li>
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