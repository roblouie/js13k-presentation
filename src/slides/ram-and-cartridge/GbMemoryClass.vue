<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`class Memory {
  cartridge: Cartridge = new Cartridge();

  private memoryBuffer: ArrayBuffer;
  private memoryView: DataView;

  constructor() {
    this.memoryBuffer = new ArrayBuffer(0x10000);
    this.memoryView = new DataView(this.memoryBuffer);
  }

  insertCartridge(cartridge: Cartridge) {
    this.cartridge = cartridge;
  }

  private isAccessingCartridge(address: number): boolean {
    return address < 0x8000;
  }

  readByte(address: number) {
    if (this.isAccessingCartridge(address)) {
      return this.cartridge.readByte(address);
    } else {
      return this.memoryView.getUint8(address);
    }
  }

  readWord(address: number) {
    if (this.isAccessingCartridge(address)) {
      return this.cartridge.readWord(address);
    } else {
      return this.memoryView.getUint16(address, true);
    }
  }

  writeByte(address: number, value: number) {
    if (!this.isAccessingCartridge(address)) {
      this.memoryView.setUint8(address, value);
    }
  }

  writeWord(address: number, value: number) {
    if (!this.isAccessingCartridge(address)) {
      this.memoryView.setUint16(address, value, true);
    }
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