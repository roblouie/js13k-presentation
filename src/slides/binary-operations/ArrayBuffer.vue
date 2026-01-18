<script setup lang="ts">
import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      Many Bytes
    </template>

    <template v-slot:default>
      <ul>
        <li><b class="has-text-white">ArrayBuffer</b> - A buffer that holds byte data. Read only after creation. FileReader can read a File into an ArrayBuffer</li>
        <li><b class="has-text-white">Typed Arrays</b> - Provides an array interface into the ArrayBuffer.</li>
        <li><b class="has-text-white">DataView</b> - Allows retrieving of values from any position with multiple sizes.</li>
      </ul>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
li {
  margin: 1em;
  font-size: 1.5em;
}
</style>