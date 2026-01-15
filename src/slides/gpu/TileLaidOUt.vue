<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {computed, ref} from "vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      <div style="font-size: 0.9em !important;">Tile in Memory</div>
    </template>

    <template v-slot:default>
      <img src="./tile-laid-out.png" style="width: 90vw;" />
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>