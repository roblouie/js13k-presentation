<script setup lang="ts">
import {computed, ref} from "vue";
import NumberSystemInput from "@/components/NumberSystemInput.vue";
import BaseSlideTemplate from "@/BaseSlideTemplate.vue";

const base = 2;

const value = ref(0b00111000);
const shiftDistance = ref(1);

 const baseList = computed(() => {
   const stringArray = value.value.toString(2).padStart(8, '0').split('');

   return stringArray.map((val, index) => {
     return {
       pos: 2**(stringArray.length - index - 1),
       value: parseInt(val, 10),
     }
   })

 });

 function onChange(payload: { value: number, pos?: number }) {
   if (payload.pos) {
     value.value = setBit(value.value, 7 - payload.pos, payload.value)
   }
 }

function setBit(value: number, bitPosition: number, bitValue: number): number {
  let result = clearBit(value, bitPosition);
  if (bitValue === 1) {
    result |= 0b1 << bitPosition;
  }

  return result;
}

function clearBit(value: number, bitPosition: number): number {
  return value & ~(0b1 << bitPosition);
}
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Bitwise Shift << and >>
      <div class="controls" style="font-size: 1rem;">
        <select class="select" v-model="shiftDistance">
          <option :value="1">1</option>
          <option :value="2">2</option>
          <option :value="3">3</option>
          <option :value="4">4</option>
        </select>
      <button class="button is-primary" @click="() => value = value << shiftDistance"> << {{ shiftDistance }} </button>
      <button class="button is-primary" @click="() => value = value >> shiftDistance"> >> {{ shiftDistance }} </button>
      </div>
    </template>

    <template v-slot:default>
        <div class="is-flex is-justify-content-end" style="width: 100%;">
          <div v-for="(b, index) in baseList" :key="b.pos" class="position">
            <div style="margin-bottom: 0.3em; margin-top: -0.3em;">
              {{ new Intl.NumberFormat().format(b.pos) }}
            </div>
            <NumberSystemInput :base="base" v-model="b.value" :pos="index" @update="onChange" />
          </div>
        </div>

      <div class="as-text">{{ value }}</div>

    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
pre {
  width: 8em;
  text-align: right;
}

.position {
  font-family: monospace;
  border: 2px solid gray;
  font-size: 0.8em;
  text-align: center;
  width: 6rem;
  height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    font-family: monospace;
    font-size: 2rem;
    width: 1.5em;
    text-align: center;
  }
}

.controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1em;
  margin-top: 1em;

  select {
    font-size: 1em;
  }
}

.as-text {
  margin-top: 2em;
  font-size: 2em;
}
</style>