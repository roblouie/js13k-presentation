<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Number Systems
    </template>

    <template v-slot:default>
      <div class="is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-center is-align-items-center">

        <p class="mt-3">Decimal (Base 10), Binary (Base 2), Hexadecimal (Base 16)</p>
      </div>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>

</style>