<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Build Process
    </template>

    <template v-slot:default>
      <div>
        <!--      <div class="is-flex is-flex-direction-column is-justify-content-space-evenly" style="height:100%">-->
        <p class="mb-6"><span class="has-text-weight-light is-italic">(For the most part)</span> Write clean readable TypeScript and let the build process make things small</p>
        <p class="mb-6">Overall build process is handled by Vite, with some custom plugins</p>
        <p>TypeScript compiler -> Google Closure Compiler -> HTML/CSS minifier and inliner -> Roadroller</p>
      </div>
      <!--      </div>-->
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
p {
  font-size: 2em;
}
</style>