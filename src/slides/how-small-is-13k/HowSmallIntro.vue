<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      How Small is 13kb
    </template>

    <template v-slot:default>
      <div class="is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-center is-align-items-center">

        <img src="./Floppy_disk_2009_G1.jpeg" />
        <p class="mt-3">Older large floppy discs hold 360kb (20 games), newer smaller floppy discs hold 1.44mb (~110 games)</p>
      </div>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
img {
  height: 20em;
}
</style>