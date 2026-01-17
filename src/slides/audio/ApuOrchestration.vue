<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`class APU {
  private static FrameSequencerHertz = 512;
  private readonly FrameSequencerInterval = CPU.OperatingHertz / APU.FrameSequencerHertz;

  private audioContext = new AudioContext();

  private frameSequencerCycleCounter = 0;

  private cyclesPerSample = CPU.OperatingHertz / this.audioContext.sampleRate;
  private sampleCycleCounter = 0;

  private sound1: Sound1;
  private sound2: Sound2;
  private sound3: Sound3;
  private sound4: Sound4;

  constructor() {
    this.sound1 = new Sound1();
    this.sound2 = new Sound2();
    this.sound3 = new Sound3();
    this.sound4 = new Sound4();
  }

  tick(cycles: number) {
    this.sound1.tick(cycles);
    this.sound2.tick(cycles);
    this.sound3.tick(cycles);
    this.sound4.tick(cycles);

    this.sampleCycleCounter += cycles;
    if (this.sampleCycleCounter >= this.cyclesPerSample) {
      this.sampleChannels()
      this.sampleCycleCounter -= this.cyclesPerSample;
    }

    this.frameSequencerCycleCounter += cycles;
    if (this.frameSequencerCycleCounter >= this.FrameSequencerInterval) {
      this.advanceFrameSequencer();
      this.frameSequencerCycleCounter -= this.FrameSequencerInterval;
    }
  }

  private sampleChannels() {
    const sample = (this.sound1.getSample() + this.sound2.getSample()
                  + this.sound3.getSample() + this.sound4.getSample()) / 4;
    this.bufferData[this.tempIndex] = sample;
  }

  //  Frame Sequencer
  //  Step   Length Ctr  Vol Env     Sweep
  // ---------------------------------------
  //   0      Clock       -           -
  //   1      -           -           -
  //   2      Clock       -           Clock
  //   3      -           -           -
  //   4      Clock       -           -
  //   5      -           -           -
  //   6      Clock       -           Clock
  //   7      -           Clock       -
  // ---------------------------------------
  //  Rate   256 Hz      64 Hz       128 Hz
  private frameSequencerStep = 0;

  private advanceFrameSequencer() {
    switch(this.frameSequencerStep) {
      case 0:
        this.clockLength();
        break;
      case 2:
        this.clockLength();
        this.clockSweep();
        break;
      case 4:
        this.clockLength();
        break;
      case 6:
        this.clockLength();
        this.clockSweep();
        break;
      case 7:
        this.clockVolume();
        break;
    }
    this.frameSequencerStep++;
    if (this.frameSequencerStep === 8) {
      this.frameSequencerStep = 0;
    }
  }`);

</script>

<template>
  <BaseSlideTemplate>

  <template v-slot:header>
    APU Class
  </template>

  <template v-slot:default>
    <div style="height: 78vh; ">
      <PrismEditor class="my-editor" style="width: 92vw; font-size: 0.8em;" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>