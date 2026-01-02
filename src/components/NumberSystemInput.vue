<template>
  <input
      type="text"
      :value="displayValue"
      inputmode="numeric"
      maxlength="1"
      @input="onInput"
      @keydown.up.prevent="step(1)"
      @keydown.down.prevent="step(-1)"
      @wheel.prevent="step(Math.sign($event.deltaY) * -1)"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  base: 2 | 10 | 16;
  pos?: number;
}>()

const modelValue = defineModel<number>({
  required: true,
});

const emit = defineEmits({
  update(payload: { pos: number | undefined, value: number }) {}
});

const maxValue = computed(() => props.base - 1)

function clampWrap(v: number) {
  if (v < 0) return maxValue.value
  if (v > maxValue.value) return 0
  return v
}

const displayValue = computed(() => {
  if (props.base === 16) {
    return modelValue.value.toString(16).toUpperCase()
  }
  return modelValue.value.toString()
})

function onInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value.toUpperCase()

  const parsed =
      props.base === 16
          ? parseInt(raw, 16)
          : parseInt(raw, 10)

  if (
      Number.isNaN(parsed) ||
      parsed < 0 ||
      parsed > maxValue.value
  ) {
    return
  }

  modelValue.value = parsed;

  emit('update', { pos: props.pos, value: parsed });
}

function step(dir: 1 | -1) {
  let value = modelValue.value;

  if (dir === -1) {
    if (value > 0) {
      value--;
    }
  } else {
    if (value < maxValue.value) {
      value++;
    }
  }

  modelValue.value = value;

  emit('update', { pos: props.pos, value });
}
</script>