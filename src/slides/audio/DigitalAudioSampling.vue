<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {computed, ref} from "vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      <div style="font-size: 0.9em !important;">Digital Audio</div>
    </template>

    <template v-slot:default>
      <img src="./audio-sampling.png" style="height: 50vh; margin-bottom: 1em; filter: invert()" />
      <img src="./audio-sampling-2.png" style="height: 25vh; filter: invert()" />
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>