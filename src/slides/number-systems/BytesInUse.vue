<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      Bytes
    </template>

    <template v-slot:default>
        <div class="grid" style="width: 100%;">
          <div class="cell is-flex is-flex-direction-column is-align-items-center">
            <img src="./nes-gameboy.jpg" style="height: 30vh; width: auto;"/>
            <div>NES & GameBoy</div> <div>8 bits / 1 byte</div>
          </div>
          <div class="cell is-flex is-flex-direction-column is-align-items-center">
            <img src="./sega.png" style="height: 30vh; width: auto;"/>
            <div>Genesis & SNES</div> <div>16 bits / 2 bytes</div>
          </div>
          <div class="cell is-flex is-flex-direction-column is-align-items-center">
            <img src="./playstation.png" style="height: 30vh; width: auto;"/>
            <div>Playstation & Saturn</div> <div>32 bits / 4 bytes</div>
          </div>
          <div class="cell is-flex is-flex-direction-column is-align-items-center">
            <img src="./n64.png" style="height: 30vh; width: auto;"/>
            <div>N64</div> <div>64 bits / 8 bytes</div>
          </div>
          <div class="cell is-flex is-flex-direction-column is-align-items-center">
            <img src="./windows.png" style="height: 30vh; width: auto;"/>
            <div>Windows</div> <div>64 bits / 8 bytes</div>
          </div>
        </div>

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