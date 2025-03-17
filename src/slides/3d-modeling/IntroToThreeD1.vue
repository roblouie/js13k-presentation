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
      <div class="editor-result-horizontal">

        <ul class="is-flex is-flex-direction-column is-justify-content-space-evenly">
          <li>
            If you've placed things at x and y positions, you already know 2D positioning.
          </li>

          <li>Add a z to that (depth), and you get 3D.</li>
        </ul>

        <PrismEditor class="my-editor" v-model="code" :highlight="code => highlight(code, languages.css, 'css')" />

      </div>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>