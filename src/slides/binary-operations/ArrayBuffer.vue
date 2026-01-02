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
        <li>ArrayBuffer - A buffer that holds byte data. Read only after creation. FileReader can read a File into an ArrayBuffer</li>
        <li>Typed Arrays - Provides an array interface into the ArrayBuffer.</li>
        <li>DataView - Allows retrieving of values from any position with multiple sizes.</li>
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