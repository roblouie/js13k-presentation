<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`class Cartridge {
  static EntryPointOffset = 0x100;

  protected gameDataView: DataView;

  constructor(gameData: ArrayBuffer) {
    this.gameDataView = new DataView(gameData);
  }

  readByte(address: number) {
    return this.gameDataView.getUint8(address);
  }

  readWord(address: number) {
    return this.gameDataView.getUint16(address, true);
  }
}`);

</script>

<template>
  <BaseSlideTemplate>



  <template v-slot:default>
    <div class="is-flex is-align-items-center" style="height: 100vh; padding: 3em 2em 3em 2em">

      <PrismEditor class="my-editor" style="width: 90vw; font-size: 0.8em;" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>