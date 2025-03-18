<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Audio
    </template>

    <template v-slot:default>
      <div class="is-flex-grow-1 is-flex flex-column is-justify-content-center is-align-items-center">

        <img src="./synth.png" />
      </div>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>

</style>