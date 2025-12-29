<script setup lang="ts">
import numberToText from 'number-to-text';
import 'number-to-text/converters/en-us';
import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {computed, ref} from "vue";
import NumberSystemInput from "@/components/NumberSystemInput.vue";

const base = ref(16);
const baseList = ref([
  { pos: 1048576, value: 9 },
  { pos: 65536, value: 9 },
  { pos: 4096, value: 9 },
  { pos: 256, value: 9 },
  { pos: 16, value: 9 },
  { pos: 1, value: 9 }
]);

const isVerticalMode = ref(false);

setTimeout(() => isVerticalMode.value = true, 2000);

function addToBaseList() {
  const nextValue = baseList.value[0].pos * base.value;
  baseList.value.unshift({ pos: nextValue, value: 0 });
}

function removePlace() {
  if (baseList.value.length > 1) {
    baseList.value.shift();
  }
}

const numberAsText = computed(() => {
  const total = baseList.value.reduce((acc, curr) => acc + curr.pos * curr.value, 0);
  return numberToText.convertToText(total);
});

const numberAsHexColorCode = computed(() => {
  const total = baseList.value.reduce((acc, curr) => acc + curr.pos * curr.value, 0);
  return '#' + total.toString(16).padStart(6, '0');
})

</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Bytes as Colors
    </template>

    <template v-slot:default>

<!--      <div class="is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-center is-align-items-center">-->

        <div class="is-flex is-justify-content-center" style="width: 100%;">
<!--          <div class="is-flex">-->
            <div v-for="(b, index) in baseList" :key="b.pos" class="position" :class="`bit-${index}`">
              <div style="margin-bottom: 0.3em; margin-top: -0.3em;">{{ new Intl.NumberFormat().format(b.pos) }}</div>
              <NumberSystemInput :base="base" v-model="b.value" />
            </div>
<!--          </div>-->

<!--          <div>also</div>-->
        </div>

      <div class="as-text" :style="{ color: numberAsHexColorCode }">{{ numberAsText }}</div>
<!--      </div>-->
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
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

.bit-4, .bit-5 {
  color: blue;
  border-color: blue;

  input {
    color: blue;
    border-color: blue;
  }
}

.bit-2, .bit-3 {
  color: green;
  border-color: green;

  input {
    color: green;
    border-color: green;
  }
}

.bit-0, .bit-1 {
  color: red;
  border-color: red;

  input {
    color: red;
    border-color: red;
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