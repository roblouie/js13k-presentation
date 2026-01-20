<template>
  <div class="stackAnim" :style="{ '--rows': rows }" @click="next">
    <!-- SP arrow -->
    <div class="spCol">
      <div class="spArrow" :style="spStyle">SP ▶</div>
    </div>

    <!-- Stack cells -->
    <div class="stackCol">
      <div
          v-for="(cell, i) in cells"
          :key="i"
          class="cell"
          :class="{ top: i === spIndex }"
      >
        <Transition name="item" mode="out-in">
          <div v-if="cell" :key="cell" class="cellValue">{{ cell }}</div>
          <div v-else key="empty" class="cellEmpty"></div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const rows = 8;
const startSpIndex = 5;

// What we “push”
const sequence = ["0x0150", "0x3E2A", "0xC123"];

const cells = ref<(string | null)[]>(Array.from({ length: rows }, () => null));
const spIndex = ref(startSpIndex);

// Step state
// 0..2 = pushes
// 3..5 = pops
// 6     = reset
const step = ref(0);

function push(value: string) {
  spIndex.value = Math.max(0, spIndex.value - 1);
  cells.value[spIndex.value] = value;
}

function pop() {
  cells.value[spIndex.value] = null;
  spIndex.value = Math.min(rows - 1, spIndex.value + 1);
}

function reset() {
  for (let i = 0; i < rows; i++) cells.value[i] = null;
  spIndex.value = startSpIndex;
  step.value = 0;
}

function next() {
  if (step.value < sequence.length) {
    // PUSH phase
    push(sequence[step.value]);
  } else if (step.value < sequence.length * 2) {
    // POP phase
    pop();
  } else {
    // Reset and start over
    reset();
    return;
  }

  step.value++;
}

const spStyle = computed(() => ({
  transform: `translateY(${spIndex.value * 44}px)`,
}));
</script>

<style scoped>
.stackAnim {
  display: grid;
  grid-template-columns: 80px 220px;
  gap: 12px;
  align-items: start;
  cursor: pointer;
  user-select: none;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

/* SP column */
.spCol {
  position: relative;
  height: calc(44px * var(--rows));
}
.spArrow {
  position: absolute;
  width: 200px;
  left: 0;
  top: 0;
  height: 44px;
  display: flex;
  align-items: center;
  font-weight: 800;
  transition: transform 260ms ease;
}

/* Stack cells */
.stackCol {
  border: 1px solid #ddd;
  border-radius: 14px;
  overflow: hidden;
}
.cell {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid #eee;
}
.cell:last-child { border-bottom: none; }

.cell.top {
  background: rgba(0, 0, 0, 0.04);
}

.cellValue {
  font-variant-numeric: tabular-nums;
  font-weight: 800;
}

.cellEmpty {
  opacity: 0.2;
}

/* Slide + fade */
.item-enter-active,
.item-leave-active {
  transition: transform 260ms ease, opacity 260ms ease;
}
.item-enter-from {
  transform: translateX(12px);
  opacity: 0;
}
.item-leave-to {
  transform: translateX(-12px);
  opacity: 0;
}
</style>