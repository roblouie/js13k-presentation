<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {computed, ref} from "vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      <div style="font-size: 0.9em !important;">Sprite Priority</div>
    </template>

    <template v-slot:default>
      <img src="./obj-priority-by-x.png" style="height: 75vh; filter: invert()" />
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>