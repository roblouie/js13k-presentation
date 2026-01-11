<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {computed, ref} from "vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      <div style="font-size: 0.9em !important;">ADD A, r</div>
    </template>

    <template v-slot:default>
      <div class="is-flex flex-column is-align-items-center" style="width: 80vw; margin-bottom: 1em; margin-top: -3em;">
      </div>
      <img src="./add-a-r-instr.png" style="width: 80vw; filter: invert();" />
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>