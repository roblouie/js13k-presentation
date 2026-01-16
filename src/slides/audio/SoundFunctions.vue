<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {computed, ref} from "vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      <div style="font-size: 0.9em !important;">Sound Functions</div>
    </template>

    <template v-slot:default>
      <img src="./sound-functions.png" style="width: 70vw; margin-bottom: 1em; filter: invert()" />
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>