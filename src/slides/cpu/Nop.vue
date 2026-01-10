<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      NOP (No Operation)
    </template>

    <template v-slot:default>
      <img src="./nop.png" style="width: 90vw; filter: invert(); margin-top: -5em;" />
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>