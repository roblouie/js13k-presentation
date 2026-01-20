<template>
  <div class="viz">
    <div class="top">
      <div class="controls">
        <button @click="toggle">{{ running ? "Pause" : "Play" }}</button>
        <button @click="stepOnce">Step</button>
        <button @click="reset">Reset</button>

        <label class="ctrl">
          CPU cycles / tick
          <input type="range" min="1" max="80" step="1" v-model.number="cyclesPerTick" />
          <span class="mono">{{ cyclesPerTick }}</span>
        </label>

<!--        <label class="ctrl">-->
<!--          Slow-mo (ticks/frame)-->
<!--          <input type="range" min="1" max="8" step="1" v-model.number="ticksPerRaf" />-->
<!--          <span class="mono">{{ ticksPerRaf }}</span>-->
<!--        </label>-->
      </div>

      <div class="readouts mono">
        <div>CPU cycle (total): <b>{{ cpuCycle }}</b></div>
        <div>
          Scanline (LY): <b>{{ ly }}</b>
          <span class="dim">(0–153; VBlank is 144–153)</span>
        </div>
<!--        <div style="width: 100%;">-->
<!--          Mode: <b>{{ modeName }}</b>-->
<!--          <span class="dim">(STAT mode {{ mode }})</span>-->
<!--        </div>-->
        <div style="width: 100%;">
          Cycle in line: <b>{{ cycleInLine }}</b> / {{ cyclesPerLine }}
        </div>
        <div>
          Frame cycle: <b>{{ frameCycle }}</b> / {{ cyclesPerFrame }}
        </div>
      </div>
    </div>

    <div class="row">
      <!-- CPU / Frame timeline -->
      <div class="panel">
        <div class="panelTitle">Frame timeline (70224 cycles)</div>

        <div class="frameStrip">
          <div class="frameTicks">
            <div v-for="i in frameMarks" :key="i" class="tick">
              <div class="tickLine"></div>
<!--              <div class="tickLbl mono" v-if="i % 5 === 0">{{ i * frameCyclesPerMark }}</div>-->
            </div>
          </div>

          <div class="cursor" :style="frameCursorStyle"></div>

          <!-- VBlank region overlay -->
          <div class="vblankOverlay" :style="vblankOverlayStyle" title="VBlank (lines 144–153)"></div>
        </div>

      </div>

      <!-- LY ladder -->
<!--      <div class="panel">-->
<!--        <div class="panelTitle">Scanlines (LY)</div>-->
<!--        <div class="lyLadder">-->
<!--          <div-->
<!--              v-for="n in 154"-->
<!--              :key="n"-->
<!--              class="lyRow mono"-->
<!--              :class="{-->
<!--              active: (n - 1) === ly,-->
<!--              vblank: (n - 1) >= 144-->
<!--            }"-->
<!--          >-->
<!--            <div class="lyNum">{{ (n - 1).toString().padStart(3, "0") }}</div>-->
<!--            <div class="lyBar"></div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>

    <!-- Scanline mode breakdown -->
    <div class="panel wide">
      <div class="panelTitle">One scanline (456 cycles): Mode 2 → Mode 3 → Mode 0</div>

      <div class="scanlineStrip">
        <div class="seg mode2">
          <div class="segTitle">OAM</div>
<!--          <div class="segSub">OAM Search</div>-->
          <div class="segLen mono">{{ cyclesOAM }} cycles</div>
        </div>
        <div class="seg mode3">
          <div class="segTitle">VRAM</div>
<!--          <div class="segSub">VRAM Transfer / Draw</div>-->
          <div class="segLen mono">{{ cyclesVRAM }} cycles</div>
        </div>
        <div class="seg mode0">
          <div class="segTitle">HBlank</div>
<!--          <div class="segSub">HBlank</div>-->
          <div class="segLen mono">{{ cyclesHBlank }} cycles</div>
        </div>

        <div class="scanCursor" :style="scanCursorStyle"></div>
      </div>

<!--      <div class="modeHint">-->
<!--        <div class="chip mono" :class="{ on: mode === 2 }">Mode 2: CPU can’t access OAM</div>-->
<!--        <div class="chip mono" :class="{ on: mode === 3 }">Mode 3: CPU can’t access VRAM/OAM</div>-->
<!--        <div class="chip mono" :class="{ on: mode === 0 }">Mode 0: CPU regains VRAM/OAM</div>-->
<!--        <div class="chip mono" :class="{ on: mode === 1 }">Mode 1: VBlank (frame end)</div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

/**
 * Teaching visualization for Game Boy PPU timing.
 * Fixed scanline timing model:
 * - Mode 2 (OAM): 80 cycles
 * - Mode 3 (VRAM transfer): 172 cycles (simplified fixed)
 * - Mode 0 (HBlank): 204 cycles
 * Total: 456 cycles per scanline
 * Scanlines: 154 (0-153), VBlank is 144-153 (Mode 1)
 */

const cyclesOAM = 80;
const cyclesVRAM = 172;
const cyclesHBlank = 204;
const cyclesPerLine = cyclesOAM + cyclesVRAM + cyclesHBlank; // 456
const visibleLines = 144;
const totalLines = 154;
const vblankLines = totalLines - visibleLines; // 10
const cyclesPerFrame = cyclesPerLine * totalLines; // 70224

const cpuCycle = ref(0);
const running = ref(false);

const cyclesPerTick = ref(1);
const ticksPerRaf = ref(1);

// Derived timing within a frame
const frameCycle = computed(() => cpuCycle.value % cyclesPerFrame);
const ly = computed(() => Math.floor(frameCycle.value / cyclesPerLine));
const cycleInLine = computed(() => frameCycle.value % cyclesPerLine);

const mode = computed(() => {
  // VBlank
  if (ly.value >= visibleLines) return 1;

  // Visible line modes
  const c = cycleInLine.value;
  if (c < cyclesOAM) return 2;
  if (c < cyclesOAM + cyclesVRAM) return 3;
  return 0;
});

const modeName = computed(() => {
  switch (mode.value) {
    case 0: return "HBlank";
    case 1: return "VBlank";
    case 2: return "OAM Search";
    case 3: return "VRAM Transfer / Draw";
    default: return "Unknown";
  }
});

function tickCPU(cyclesToAdvance: number) {
  cpuCycle.value += cyclesToAdvance;
}

function stepOnce() {
  tickCPU(cyclesPerTick.value);
}

function toggle() {
  running.value = !running.value;
}

function reset() {
  cpuCycle.value = 0;
}

// Frame strip visuals
const frameCyclesPerMark = 600; // visual mark units
const frameMarks = 40;          // count of marks
const frameStripPxPerMark = 22; // matches CSS grid cell size
const frameStripPx = computed(() => frameMarks * frameStripPxPerMark);

const frameCursorStyle = computed(() => {
  const t = frameCycle.value / cyclesPerFrame; // 0..1
  return { transform: `translateX(${t * frameStripPx.value}px)` };
});

// VBlank overlay (last 10 lines)
const vblankStartCycle = cyclesPerLine * visibleLines; // start at LY=144
const vblankOverlayStyle = computed(() => {
  const t0 = vblankStartCycle / cyclesPerFrame;
  const t1 = 1;
  return {
    left: `${t0 * frameStripPx.value}px`,
    width: `${(t1 - t0) * frameStripPx.value}px`,
  };
});

// Scanline cursor
const scanStripPx = 900; // matches CSS width, used for cursor math
const scanCursorStyle = computed(() => {
  const t = cycleInLine.value / cyclesPerLine;
  return { transform: `translateX(${t * scanStripPx}px)` };
});

let raf = 0;
function loop() {
  if (running.value) {
    for (let i = 0; i < ticksPerRaf.value; i++) {
      tickCPU(cyclesPerTick.value);
    }
  }
  raf = requestAnimationFrame(loop);
}

onMounted(() => {
  raf = requestAnimationFrame(loop);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
});

watch([cyclesPerTick, ticksPerRaf], () => {
  // no-op; just makes the UI feel responsive when sliders change
});
</script>

<style scoped>
.viz {
  color: white;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  max-width: 1200px;
}

.title {
  font-weight: 900;
  font-size: 18px;
}

.top {
  display: grid;
  gap: 10px;
  margin-bottom: 14px;
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

.dim { opacity: 0.75; margin-left: 6px; }

.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.row {
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
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

/* Frame strip */
.frameStrip {
  position: relative;
  height: 56px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.14);
  overflow: hidden;
}

.frameTicks {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 22px;
  height: 100%;
}

.tick {
  position: relative;
  height: 100%;
}

.tickLine {
  position: absolute;
  left: 50%;
  top: 9px;
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

.cursor {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 0 0 1px rgba(0,0,0,0.25);
  pointer-events: none;
}

.vblankOverlay {
  position: absolute;
  top: 0;
  bottom: 0;
  background: rgba(255,255,255,0.10);
  border-left: 2px dashed rgba(255,255,255,0.28);
  pointer-events: none;
}

/* LY ladder */
.lyLadder {
  height: 280px;
  overflow: auto;
  padding-right: 6px;
}

.lyRow {
  display: grid;
  grid-template-columns: 44px 1fr;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  opacity: 0.85;
}

.lyRow .lyBar {
  height: 8px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
}

.lyRow.vblank .lyBar {
  background: rgba(255,255,255,0.12);
}

.lyRow.active {
  opacity: 1;
}

.lyRow.active .lyBar {
  outline: 2px solid rgba(255,255,255,0.9);
  outline-offset: 1px;
  background: rgba(255,255,255,0.18);
}

/* Scanline segments */
.scanlineStrip {
  position: relative;
  height: 92px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.14);
  overflow: hidden;
  width: 900px;        /* keep math simple; responsive-ish still works */
  max-width: 100%;
}

.seg {
  position: absolute;
  top: 0;
  bottom: 0;
  padding: 10px 12px;
  display: grid;
  gap: 4px;
}

.segTitle { font-weight: 900; }
.segSub { opacity: 0.85; font-size: 13px; }
.segLen { opacity: 0.85; font-size: 18px; }

.mode2 {
  left: 0;
  width: calc(900px * (80 / 456));
  background: rgba(255,255,255,0.08);
}
.mode3 {
  left: calc(900px * (80 / 456));
  width: calc(900px * (172 / 456));
  background: rgba(255,255,255,0.14);
}
.mode0 {
  left: calc(900px * ((80 + 172) / 456));
  width: calc(900px * (204 / 456));
  background: rgba(255,255,255,0.08);
}

.scanCursor {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 0 0 1px rgba(0,0,0,0.25);
  pointer-events: none;
}

/* Mode chips */
.modeHint {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.chip {
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.06);
  opacity: 0.85;
}

.chip.on {
  opacity: 1;
  outline: 2px solid rgba(255,255,255,0.85);
  outline-offset: 1px;
  background: rgba(255,255,255,0.12);
}
</style>