<script setup lang="ts">
import {onMounted, ref} from "vue";
import {initTextures} from "@/textures.ts";

const isLoaded = ref(false);

onMounted(async () => {
  await initTextures();
  isLoaded.value = true;
})
</script>

<template>
  <router-view v-if="isLoaded" />
</template>

<style scoped>
</style>
