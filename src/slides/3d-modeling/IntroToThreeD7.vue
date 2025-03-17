<script setup lang="ts">
import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Quick 3D Intro
    </template>

    <template v-slot:default>
      <div>
<!--      <div class="is-flex is-flex-direction-column is-justify-content-space-evenly" style="height:100%">-->
      <p class="mb-6">3D scenes generally form a tree structure</p>
      <p class="mb-6">Each node of the tree has it's own transformation matrix, and often a collection of vertices to render</p>
      <p>This structure lets us render child objects relative to their parent</p>
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