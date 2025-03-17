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
      <p class="mb-5">Graphics cards can't run JavaScript, we have to write shader code</p>
      <p class="mb-5">
        Graphics cards have their own memory (VRAM), we need to send all our relevant data to VRAM
      </p>
      <p class="mb-5">
        When moving the data to VRAM, we need to specify the size, type, and name of the data so
        we can use it in our shader code
      </p>
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