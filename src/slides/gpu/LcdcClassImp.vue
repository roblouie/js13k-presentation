<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`class LcdControlRegister implements SingleByteMemoryRegister {
  offset = 0xff40;
  name = 'LCDC';

  get value() {
    return memory.readByte(this.offset);
  }

  set value(byte: number) {
    memory.writeByte(this.offset, byte);
  }

  get isBackgroundDisplayOn() {
    return (this.value & 0b1) === 1;
  }

  get isObjOn() {
    return ((this.value >> 1) & 0b1) === 1;
  }

  get objectHeight() {
    const objectBlockCompositionFlag = ((this.value >> 2) & 0b1) === 1;
    return objectBlockCompositionFlag === 0 ? 8 : 16;
  }

  get backgroundCodeArea(): number {
    return (this.value >> 3) & 0b1;
  }

  get backgroundCharacterData() {
    return ((this.value >> 4) & 0b1) === 1;
  }

  get windowCharacterData() {
    return this.backgroundCharacterData;
  }

  get isWindowingOn() {
    return ((this.value >> 5) & 0b1) === 1;
  }

  get windowCodeArea() {
    return ((this.value >> 6) & 0b1) === 1;
  }

  get windowTileMapStartAddress() {
    return this.windowCodeArea === 0 ? 0x9800 : 0x9c00;
  }

  get backgroundTileMapStartAddress() {
    return this.backgroundCodeArea === 0 ? 0x9800 : 0x9c00;
  }

  get backgroundCharacterDataStartAddress() {
    return this.backgroundCharacterData === 0 ? 0x8800 : 0x8000;
  }

  get isLCDControllerOperating() {
    return ((this.value >> 7) & 0b1) === 1;
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