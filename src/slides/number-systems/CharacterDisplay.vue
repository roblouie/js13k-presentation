<script setup lang="ts">
import numberToText from 'number-to-text';
import 'number-to-text/converters/en-us';
import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {computed, ref} from "vue";
import NumberSystemInput from "@/components/NumberSystemInput.vue";

const base = ref(2);
const baseList = ref([{ pos: 1, value: 0 }]);

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

</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Bits to Display Text
      <div class="controls" style="font-size: 1rem;">
        <button class="button is-primary" @click="addToBaseList()">Add Place</button>
        <button class="button is-danger" @click="removePlace()">Remove Place</button>

      </div>
    </template>

    <template v-slot:default>

      <div>
        <div class="is-size-3 has-text-right">ABCDEFGHIJKLMNOPQRSTUVWXYZ = 26</div>
        <div class="is-size-3 has-text-right">abcdefghijklmnopqrstuvwxyz = 26</div>
        <div class="is-size-3 has-text-right">0123456789!@#$%^&*()_-+=[]{}\|;:'"/?,.<>`~ = 42</div>
        <div class="total is-size-2 has-text-right">94</div>
      </div>

<!--      <div class="is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-center is-align-items-center">-->

        <div class="is-flex is-justify-content-end" style="width: 100%;">
<!--          <div class="is-flex">-->
            <div v-for="b in baseList" :key="b.pos" class="position">
              <div style="margin-bottom: 0.3em; margin-top: -0.3em;">{{ new Intl.NumberFormat().format(b.pos) }}</div>
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
  margin-top: 0.5em;
  font-size: 2em;
}

.total {
  border-top: 1px solid gray;
}
</style>