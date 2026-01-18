<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`class CpuRegister {
  readonly code: number; // A: 111, B: 000, C: 001, etc...

  protected readonly offset: number;
  protected readonly dataView: DataView;

  constructor(offset: number, dataView: DataView, code: number) {
    this.offset = offset;
    this.dataView = dataView;
    this.code = code;
  }

  get value() {
      return this.dataView.getUint8(this.offset);
  }

  set value(newValue: number) {
      this.dataView.setUint8(this.offset, newValue);
  }
}`);

</script>

<template>
  <BaseSlideTemplate>
  <template v-slot:default>
    <div class="is-flex is-align-items-center" style="height: 90vh; padding: 2em 2em 3em 2em">

      <PrismEditor class="my-editor" style="width: 90vw; font-size: 0.8em;" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>