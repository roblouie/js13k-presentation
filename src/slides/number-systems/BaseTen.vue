<script setup lang="ts">
import numberToText from 'number-to-text';
import 'number-to-text/converters/en-us';
import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {computed, ref} from "vue";
import NumberSystemInput from "@/components/NumberSystemInput.vue";

const base = ref(10);
const baseList = ref([{ pos: 1, value: 0 }]);
const isShowLabelsInBase = ref(false);
const baseLabels = [100_000_000, 10_000_000, 1_000_000, 100_000, 10_000, 1000, 100, 10, 1];

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

function onBaseChange() {
  [...baseList.value].reverse().forEach((baseItem, index) => {
    baseItem.pos = base.value ** index;

    if (baseItem.value > (base.value - 1)) {
      baseItem.value = base.value - 1;
    }
  });
}

</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Base <span class="has-text-primary">{{ base }}</span>
      <div class="controls" style="font-size: 1rem;">
        <select class="select" v-model="base" @change="onBaseChange">
          <option :value="10">Decimal (Base 10)</option>
          <option :value="2">Binary (Base 2)</option>
          <option :value="16">Hexadecimal (Base 16)</option>
        </select>
        <button class="button is-primary" @click="addToBaseList()">Add Place</button>
        <button class="button is-danger" @click="removePlace()">Remove Place</button>
        <label class="checkbox">
          <input type="checkbox" v-model="isShowLabelsInBase" />
          Labels in Base
        </label>
      </div>
    </template>

    <template v-slot:default>

<!--      <div class="is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-center is-align-items-center">-->

        <div class="is-flex is-justify-content-end" style="width: 100%;">
<!--          <div class="is-flex">-->
            <div v-for="(b, index) in baseList" :key="b.pos" class="position">
              <div style="margin-bottom: 0.3em; margin-top: -0.3em;">
                <template v-if="isShowLabelsInBase">{{ new Intl.NumberFormat().format(baseLabels[index]) }}</template>
                <template v-else>{{ new Intl.NumberFormat().format(b.pos) }}</template>
              </div>
              <NumberSystemInput :base="base" v-model="b.value" />
            </div>
<!--          </div>-->

<!--          <div>also</div>-->
        </div>

      <div class="as-text">{{ numberAsText }}</div>
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