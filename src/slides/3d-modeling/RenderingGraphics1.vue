<script setup lang="ts">
import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Rendering Graphics
    </template>

    <template v-slot:default>
      <div>
<!--      <div class="is-flex is-flex-direction-column is-justify-content-space-evenly" style="height:100%">-->
      <p class="mb-5">We could now multiply our points by these matrices and draw them with JavaScript in the browser</p>
      <p class="mb-5">We'd have to make our own texture sampler, and either sort our polygons back to front or make a depth buffer</p>
      <p class="mb-5">Matrix math against hundreds of thousands of vertices on a cpu is very slow</p>
      <p>We should leverage graphics cards, which do all of this for us and are very very fast at doing math and drawing pixels</p>

      </div>
<!--      </div>-->
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
p {
  font-size: 1.5em;
}
</style>