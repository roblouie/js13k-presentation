<script setup lang="ts">
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

const code = `
// In eslint config
id-denylist': [
  'seed', 'direction', 'clone',
  'normalize', 'setAttribute', 'done',
  'all', 'translate', 'scale', 'rotate',
  'position', 'rotation', 'children',
  'parent', 'remove', 'setRotation',
  'textureRepeat', 'load', 'image',
  'width', 'height', 'offset'
],`;

const code2 = `noiseMaker.seed_(7);
player.direction_.x = -1;
moldableCube.done_();
domPoint.clone_();
domPoint.normalize_();
domPont.all_();
`;
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Handling Reserved Words
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