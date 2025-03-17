<script setup lang="ts">
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-glsl';

const code = `layout(location = 0) in vec4 aCoords;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aTexCoord;

uniform mat4 modelviewProjection;

out vec2 vTexCoord;
out vec3 vNormal;

void main() {
    gl_Position = modelviewProjection * aCoords;

    vTexCoord = aTexCoord;
    vNormal = aNormal;
}`;
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Vertex Shader
    </template>

    <template v-slot:default>

      <PrismEditor class="my-editor" v-model="code" :highlight="code => highlight(code, languages.glsl, 'glsl')" />

    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
.my-editor {
  font-size: 0.8em;
  height: 25em;
}
</style>