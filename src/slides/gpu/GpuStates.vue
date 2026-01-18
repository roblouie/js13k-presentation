<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      GPU States
    </template>

    <template v-slot:default>
      <div class="is-size-5 has-text-white" style="width: 90vw;">
      For each of 144 scanlines:
      </div>
      <ul>
        <li>
          Read from OAM (sprite positioning info) for 80 cycles.
        </li>
        <li>
          Transfer pixels for that scanline to the LCD screen for drawing. These are determined by
          checking what tiles are being drawn in the background, window, and sprite layers
          and reading the relevant tile pixels.
        </li>
        <li>
          Draw the scanline.
        </li>
      </ul>

      <div class="is-size-5 has-text-white" style="width: 90vw;">
        After all 144 lines are drawn:
      </div>
      <ul>
        <li>
          VBlank for 4560 cycles. This is the time it takes from finishing drawing the frame to being ready to start
          the process over again.
        </li>
      </ul>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  list-style: disclosure-closed;
  margin: 1em 2em;
  font-size: 1.1em;
}

li {
  margin-bottom: 0.8em;
}
</style>