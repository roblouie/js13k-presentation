<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      Program Counter
    </template>

    <template v-slot:default>
      <ul>
        <li>Holds the address in memory of the next command to execute.</li>
        <li>
          16-bit (2 byte) value. It <b>has</b> to be, as the gameboy ram size is 0x1000, so it has
          to be able to point to any value between 0x0 and 0xFFFF.
        </li>
        <li>Will advance sequentially unless a command runs that tells it to move to a new location.</li>
        <li>
          This is the core of how the program executes. Just like JavaScript executes line-by-line, in order,
          unless it comes across a function, loop, or if block that makes it jump somewhere else.
        </li>
      </ul>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  list-style: disclosure-closed;
  margin: 1em;
  font-size: 1.3em;
}

li {
  margin-bottom: 0.5em;
}
</style>