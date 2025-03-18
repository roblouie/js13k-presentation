<script setup lang="ts">
import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Graphics Summary
    </template>

    <template v-slot:default>
      <div>
        <p class="mb-6">Leverage and extend the browser's built in DOMPoint and DOMMatrix</p>
        <p class="mb-6">Use TypeScript functions and simple math to reshape cubes into other shapes for 3D modeling</p>
        <p>Write effective but minimal code to create a scene graph, render, and shadows.</p>
      </div>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
p {
  font-size: 2em;
}
</style>