<script setup lang="ts">
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-glsl';

const code = `in vec2 vTexCoord;
in vec3 vNormal;

uniform mediump sampler2D uSampler;

out vec4 outColor;

vec3 lightDirection = vec3(-0.41, 0.82, 0.41);
float ambientLight = 0.4f;

void main() {
  float litPercent = clamp(dot(lightDirection, vNormal), ambientLight, 1.0);

  outColor = texture(uSampler, vTexCoord) * litPercent;
}`;

</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Fragment Shader
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