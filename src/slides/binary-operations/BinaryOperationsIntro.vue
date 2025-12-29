<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Bitwise Operations
    </template>

    <template v-slot:default>
      <div class="is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-center is-align-items-center">

        <div class="examples is-size-2">
          <div>0 | 1 === 1</div>
          <div>0 & 1 === 0</div>
          <div>0011 << 1 === 0110</div>
          <div>0110 >> 1 === 0011</div>
        </div>

        <p class="mt-6">It's logic, but for bits</p>
      </div>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
.examples {
  font-family: monospace;
}
</style>