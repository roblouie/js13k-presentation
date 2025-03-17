<script setup lang="ts">

import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import BaseSlideTemplate from "@/BaseSlideTemplate.vue";

const code = `// css to position something with vector 30,100
position: absolute;
left: 30px;
top: 100px;

// css to translate by vector 5, 5
transform: translate(5px, 5px);

// css actually supports 3D
// here we translate by 10, 10, 10
transform: translate3d(10px, 10px, 10px);
`;
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Quick 3D Intro
    </template>

    <template v-slot:default>
      <div class="is-flex-grow-1 is-flex flex-column is-justify-content-center is-align-items-center">
        <img src="./matrix-multiplication-image.png" />
      </div>
      <p>A matrix is just a way of representing a series of numbers that should be multiplied and added a certain way</p>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
img {
  height: 20em;
}
</style>