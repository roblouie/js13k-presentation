<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      Bits and Bytes
    </template>

    <template v-slot:default>
      <div class="is-size-2 background-text">A <span class="has-text-primary has-text-weight-bold">bit</span> is a single
        <span class="has-text-primary has-text-weight-bold">bi</span>nary digi<span class="animated-t has-text-primary has-text-weight-bold">t</span>, so 0 or 1.
      </div>

      <div class="mt-6 is-size-2">A <span class="has-text-primary has-text-weight-bold">byte</span> is <span class="has-text-primary has-text-weight-bold">8 bits</span>, so can be 0 - 255.</div>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
img {
  height: 24em;
}

.animated-t {
  display: inline-block;
  animation: slide 6s ease-in-out infinite;
}

@keyframes slide {
  0%, 30%   { transform: translateX(0); }
  50%, 80%  { transform: translateX(-3.9em); }
  100%      { transform: translateX(0); }
}

@keyframes color-shift {
  0%, 30%   { color: rgb(171, 177, 191); }
  50%, 80%  { color: rgb(38, 41, 49); }
  100%      { color: rgb(171, 177, 191); }
}

.background-text {
  animation: color-shift 6s ease-in-out infinite;
}
</style>