<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      Timing
    </template>

    <template v-slot:default>
      <ul>
        <li>
          The emulated CPU can't just run indefinitely. It would keep JS's main thread busy and we could never play
          sound or draw graphics to the screen.
        </li>
        <li>
          We need to accurately limit the rate at which the cpu can run commands to emulate the GameBoy's 4.194304 MHz Processor
        </li>
        <li>
          For accurate emulation, we need to sync up the states of the CPU and APU (audio processor) with the CPU's commands.
        </li>
        <li>
          Since we will be drawing to the screen at 60fps, this is the perfect timing limitation. For every frame of animation
          we run with requestAnimationFrame, we will run the CPU for as many cycles as can be run in one frame of animation.
        </li>
      </ul>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  list-style: disclosure-closed;
  margin: 1em;
  font-size: 1.4em;
}

li {
  margin-bottom: 0.8em;
}
</style>