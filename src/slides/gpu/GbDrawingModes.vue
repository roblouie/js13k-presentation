<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      GameBoy Drawing
    </template>

    <template v-slot:default>
      <ul>
        <li>
          <b class="has-text-white">Background</b> - Draw tiles into a background layer. This layer is larger than the screen to allow scrolling.</li>
        <li>
          <b class="has-text-white">Window</b> - Draw tiles into a window. Games specify an X and Y position, and a window is drawn from that position
          to the right and bottom of the screen.
        </li>
        <li>
          <b class="has-text-white">Sprite (OBJ)</b> - Games specify an x and y position, and horizontal/vertical mirroring, and draw a tile.
          Used for animated parts of the screen like player, enemies, items, explosions.
        </li>
      </ul>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  list-style: disclosure-closed;
  margin: 1em;
  font-size: 1.5em;
}

li {
  margin-bottom: 0.8em;
}
</style>