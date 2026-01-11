<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`class DoubleCpuRegister extends CpuRegister {
  override get value() {
    return this.dataView.getUint16(this.offset, true);
  }

  override set value(newValue: number) {
    this.dataView.setUint16(this.offset, newValue, true);
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