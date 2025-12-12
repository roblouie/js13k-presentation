<script setup lang="ts">
import {onMounted, ref} from "vue";

const isLoaded = ref(false);

onMounted(async () => {
  isLoaded.value = true;
})
</script>

<template>
  <router-view v-if="isLoaded" />
</template>

<style scoped>
</style>
