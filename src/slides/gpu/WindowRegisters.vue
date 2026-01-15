<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {computed, ref} from "vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      <div style="font-size: 0.9em !important;">Window Position</div>
    </template>

    <template v-slot:default>
      <img src="./window-position-registers.png" style="width: 75vw; filter: invert()" />
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>