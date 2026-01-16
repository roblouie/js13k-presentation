<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {computed, ref} from "vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      <div style="font-size: 0.9em !important;">Sweep Timing</div>
    </template>

    <template v-slot:default>
      <img src="./sweep-timing.png" style="height: 70vh; filter: invert()" />
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>