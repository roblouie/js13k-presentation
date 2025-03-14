<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Perlin Noise
    </template>

    <template v-slot:default>
      <div class="is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly">
      <img src="./perlin-animation.gif" style="height: 45%;" />
<!--        <div>-->
<!--        Ken Perlin developed Perlin noise in 1983 as a result of his frustration with the "machine-like" look of-->
<!--        computer-generated imagery (CGI) at the time.[1] He formally described his findings in a SIGGRAPH paper in-->
<!--        1985 called "An Image Synthesizer".[2] He developed it after working on Disney's computer animated sci-fi-->
<!--        motion picture Tron (1982) for the animation company Mathematical Applications Group (MAGI).[3] In 1997,-->
<!--        Perlin was awarded an Academy Award for Technical Achievement for creating the algorithm-->
<!--        </div>-->
      </div>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  font-size: 1.5em;
}
</style>