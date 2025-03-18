<script setup lang="ts">
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

const code = `// In the player class

const listener = new AudioListener();

listener.positionX.value = position.x;
listener.positionY.value = position.y;
listener.positionZ.value = position.z;

listener.forwardX.value = normal.x;
listener.forwardY.value = normal.y;
listener.forwardZ.value = normal.z;`;

const code2 = `// In the enemy class

new PannerNode(audioContext, {
  distanceModel: 'linear',
  maxDistance: 80,
  rolloffFactor: 99,
  coneOuterGain: 0.1
});

pannerNode.positionX.value = position.x;
pannerNode.positionZ.value = position.z;`;
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      3D Spatial Audio
    </template>

    <template v-slot:default>
      <div class="editor-result-horizontal is-align-items-center">
        <PrismEditor class="my-editor" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />

        <PrismEditor class="my-editor" v-model="code2" :highlight="code => highlight(code, languages.ts, 'ts')" />
      </div>

    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
.my-editor {
  height: 25em;
}
</style>