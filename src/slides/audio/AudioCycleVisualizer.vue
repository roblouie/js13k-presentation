<template>
  <div class="viz">
    <div class="top">
      <div class="controls">
        <button @click="toggle">{{ running ? "Pause" : "Play" }}</button>
        <button @click="stepOnce">Step</button>
        <button @click="reset">Reset</button>

        <label class="ctrl">
          Note
          <input type="range" min="60" max="1200" step="1" v-model.number="freqHz" />
          <span class="mono">{{ freqHz }} Hz</span>
        </label>

        <label class="ctrl">
          Duty
          <select v-model.number="dutyIndex">
            <option :value="0">12.5%</option>
            <option :value="1">25%</option>
            <option :value="2">50%</option>
            <option :value="3">75%</option>
          </select>
        </label>

        <label class="ctrl">
          CPU cycles / tick
          <input type="range" min="1" max="40" step="1" v-model.number="cyclesPerTick" />
          <span class="mono">{{ cyclesPerTick }}</span>
        </label>
      </div>

      <div class="readouts mono">
        <div>CPU cycle: <b>{{ cpuCycle }}</b></div>
        <div>Cycles/sample: <b>{{ cyclesPerSample }}</b> (~{{ sampleRate }} Hz)</div>
        <div>Samples written: <b>{{ sampleWriteCount }}</b></div>
      </div>
    </div>

    <div class="row">
      <!-- CPU cycle strip -->
      <div class="panel">
        <div class="panelTitle">CPU Cycles</div>
        <div class="cpuStrip">
          <div class="cpuTicks">
            <div v-for="i in cpuTickMarks" :key="i" class="tick">
              <div class="tickLine"></div>
              <div class="tickLbl mono" v-if="i % 5 === 0">{{ i * cpuCyclesPerMark }}</div>
            </div>
          </div>

          <div class="cpuCursor" :style="cpuCursorStyle"></div>
          <div class="cpuSampleGate" :style="sampleGateStyle" title="sample boundary"></div>
        </div>
        <div class="hint">Cursor advances by CPU cycles. Every ~{{ cyclesPerSample }} cycles, we produce one audio sample.</div>
      </div>

      <!-- Duty pattern -->
      <div class="panel">
        <div class="panelTitle">Duty Cycle</div>
        <div class="dutyStrip">
          <div
              v-for="i in 8"
              :key="i"
              class="dutyCell"
              :class="{
              hi: dutyPattern[i - 1] === 1,
              lo: dutyPattern[i - 1] === 0,
              phase: (i - 1) === phaseStep
            }"
          >
            <div class="mini mono duty-label">{{ dutyPattern[i - 1] }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Buffer waveform -->
    <div class="panel wide">
      <div class="panelTitle">Audio Buffer</div>
      <canvas ref="canvasEl" class="wave" :width="canvasW" :height="canvasH"></canvas>
<!--      <div class="bufferLegend mono">-->
<!--        write head: {{ writeHead }} / {{ bufferSize }}-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

/**
 * This is a teaching visualization, not cycle-accurate GB APU.
 * It shows the concept:
 * CPU cycles tick fast -> every N cycles we produce one output sample
 * -> oscillator phase chooses duty step -> store into buffer
 */

const sampleRate = 44100;
const cpuHz = 4_194_304;

const freqHz = ref(440);
const dutyIndex = ref(2); // 0..3
const cyclesPerTick = ref(1);

const running = ref(true);

const bufferSize = 256;
const buffer = new Float32Array(bufferSize);
const writeHead = ref(0);
const sampleWriteCount = ref(0);

const cpuCycle = ref(0);
const cycleRemainder = ref(0); // fractional-ish accumulator for sample timing

// phase in [0, 1)
const phase = ref(0);

// Duty patterns (8 steps). (Not GB exact ratios, but close enough for intuition.)
const DUTIES: number[][] = [
  // 12.5%: 00000001
  [0,0,0,0,0,0,0,1],
  // 25%:   00000011
  [0,0,0,0,0,0,1,1],
  // 50%:   00001111
  [0,0,0,0,1,1,1,1],
  // 75%:   00111111 (inverted 25% for intuition)
  [0,0,1,1,1,1,1,1],
];

const dutyPattern = computed(() => DUTIES[dutyIndex.value]);

const phaseStep = computed(() => {
  // map phase to 0..7
  return Math.floor(phase.value * 8) & 7;
});

const cyclesPerSample = computed(() => Math.round(cpuHz / sampleRate));

// Canvas
const canvasEl = ref<HTMLCanvasElement | null>(null);
const canvasW = 900;
const canvasH = 240;

function clearBuffer() {
  buffer.fill(0);
  writeHead.value = 0;
  sampleWriteCount.value = 0;
}

function reset() {
  cpuCycle.value = 0;
  cycleRemainder.value = 0;
  phase.value = 0;
  clearBuffer();
  draw();
}

function dutyValueForCurrentPhase(): number {
  // convert 0/1 to -1/+1 for plotting
  return dutyPattern.value[phaseStep.value] ? 1 : -1;
}

function writeSample(sample: number) {
  buffer[writeHead.value] = sample;
  writeHead.value = (writeHead.value + 1) % bufferSize;
  sampleWriteCount.value++;
}

function advanceOscillatorOneSample() {
  // each output sample advances phase by freq/sampleRate
  const inc = freqHz.value / sampleRate;
  phase.value = (phase.value + inc) % 1;
}

function tickCPU(cyclesToAdvance: number) {
  cpuCycle.value += cyclesToAdvance;

  // Sample clock: every cyclesPerSample, emit one audio sample
  cycleRemainder.value += cyclesToAdvance;
  while (cycleRemainder.value >= cyclesPerSample.value) {
    cycleRemainder.value -= cyclesPerSample.value;

    // sample duty at current phase
    const s = dutyValueForCurrentPhase();
    writeSample(s);

    // advance osc once per output sample
    advanceOscillatorOneSample();
  }
}

function stepOnce() {
  tickCPU(cyclesPerTick.value);
  draw();
}

let raf = 0;
function loop() {
  if (running.value) {
    // advance a few CPU ticks per animation frame (visual speed)
    tickCPU(cyclesPerTick.value);
    draw();
  }
  raf = requestAnimationFrame(loop);
}

function toggle() {
  running.value = !running.value;
}

function draw() {
  const canvas = canvasEl.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // center line
  ctx.beginPath();
  ctx.moveTo(0, canvasH / 2);
  ctx.lineTo(canvasW, canvasH / 2);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.stroke();

  // waveform
  const mid = canvasH / 2;
  const amp = canvasH * 0.35;

  ctx.beginPath();
  for (let i = 0; i < bufferSize; i++) {
    // draw with writeHead as a “scrolling” ring display
    const idx = (writeHead.value + i) % bufferSize;
    const x = (i / (bufferSize - 1)) * (canvasW - 1);
    const y = mid - buffer[idx] * amp;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.lineWidth = 3;
  ctx.strokeStyle = "white";
  ctx.stroke();

  // write head marker (left edge is newest)
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, canvasH);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.stroke();
}

// CPU strip visuals
const cpuCyclesPerMark = 20;      // how many CPU cycles each mark represents visually
const cpuTickMarks = 30;          // number of marks on the strip
const cpuStripW = computed(() => cpuTickMarks * 28); // only for cursor math; matches CSS cell width

const cpuCursorStyle = computed(() => {
  const mod = cpuCycle.value % (cpuCyclesPerMark * cpuTickMarks);
  const t = mod / (cpuCyclesPerMark * cpuTickMarks); // 0..1
  return { transform: `translateX(${t * (cpuTickMarks * 28)}px)` };
});

const sampleGateStyle = computed(() => {
  // show where the next sample boundary is relative to current remainder
  const remaining = cyclesPerSample.value - cycleRemainder.value;
  const nextCycle = (cpuCycle.value + remaining) % (cpuCyclesPerMark * cpuTickMarks);
  const t = nextCycle / (cpuCyclesPerMark * cpuTickMarks);
  return { transform: `translateX(${t * (cpuTickMarks * 28)}px)` };
});

onMounted(() => {
  reset();
  raf = requestAnimationFrame(loop);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
});

watch([freqHz, dutyIndex], () => draw());
</script>

<style scoped>
.viz {
  color: white;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  max-width: 1100px;
}

.duty-label {
  text-align: center;
}

.top {
  display: grid;
  gap: 10px;
  margin-bottom: 14px;
}

.title {
  font-weight: 900;
  font-size: 18px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 14px;
  align-items: center;
}

button {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.08);
  color: white;
  cursor: pointer;
}
button:hover { background: rgba(255,255,255,0.12); }

.ctrl {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 6px 10px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.06);
}

.ctrl input[type="range"] { width: 180px; }

.readouts {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  opacity: 0.92;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  align-items: start;
  margin-bottom: 14px;
}

.panel {
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 12px;
}

.panel.wide { margin-top: 8px; }

.panelTitle {
  font-weight: 900;
  margin-bottom: 10px;
}

.hint {
  margin-top: 8px;
  opacity: 0.8;
  font-size: 13px;
}

.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

/* CPU strip */
.cpuStrip {
  position: relative;
  height: 54px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.14);
  overflow: hidden;
}

.cpuTicks {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 28px;
  height: 100%;
}

.tick {
  position: relative;
  height: 100%;
}
.tickLine {
  position: absolute;
  left: 50%;
  top: 8px;
  width: 1px;
  height: 28px;
  background: rgba(255,255,255,0.25);
}
.tickLbl {
  position: absolute;
  bottom: 6px;
  left: 4px;
  font-size: 11px;
  opacity: 0.7;
}

.cpuCursor {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 0 0 1px rgba(0,0,0,0.25);
}

.cpuSampleGate {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(0,0,0,0.0);
  outline: 2px dashed rgba(255,255,255,0.35);
  outline-offset: -2px;
  pointer-events: none;
}

/* Duty strip */
.dutyStrip {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
}

.dutyCell {
  height: 54px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.14);
  position: relative;
  overflow: hidden;
}

.dutyCell.hi {
  background: rgba(255,255,255,0.22);
}
.dutyCell.lo {
  background: rgba(255,255,255,0.06);
}

.dutyCell.phase {
  outline: 3px solid rgba(255,255,255,0.85);
  outline-offset: 0px;
}

.mini {
  margin-top: 18px;
  font-size: 11px;
}

/* Wave canvas */
.wave {
  width: 100%;
  height: 240px;
  display: block;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(0,0,0,0.18);
}

.bufferLegend {
  margin-top: 8px;
  opacity: 0.85;
}
</style>