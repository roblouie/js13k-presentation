<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {computed, ref} from "vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      <div style="font-size: 0.9em !important;">Metroid Background</div>
    </template>

    <template v-slot:default>
      <video src="./metroid-background.mp4" controls style="height: 75vh;" />
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>