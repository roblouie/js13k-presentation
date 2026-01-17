<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`class Sound1 {
  private dutyCycles = [
    [0, 0, 0, 0, 0, 0, 0, 1], // 12.5 %
    [1, 0, 0, 0, 0, 0, 0, 1], // 25 %
    [1, 0, 0, 0, 0, 1, 1, 1], // 50 %
    [0, 1, 1, 1, 1, 1, 1, 0], // 75 %
  ];
  private positionInDutyCycle = 0;

  private frequencyTimer = 0;
  private frequencyPeriod = this.getFrequencyPeriod();

  private lengthTimer = 0;
  private enveloper = new Enveloper();
  private volume = 0;

  private isSweepEnabled = false;
  private shadowFrequency = 0;
  private sweepTimer = 0;

  private isActive = false;

  tick(cycles: number) {
    if (sound1HighOrderFrequencyRegister.isInitialize) {
      this.playSound();
      sound1HighOrderFrequencyRegister.isInitialize = false;
    }

    this.frequencyTimer -= cycles;
    if (this.frequencyTimer <= 0) {
      this.frequencyTimer += this.frequencyPeriod;
      this.positionInDutyCycle = (this.positionInDutyCycle + 1) % 8;
    }
  }

  playSound() {
    // Enable channel
    this.isActive = true;

    // Initialize frequency
    this.frequencyPeriod = this.getFrequencyPeriod();
    this.frequencyTimer = this.frequencyPeriod;

    // Initialize envelope
    this.volume = sound1EnvelopeControlRegister.initialVolume;
    this.enveloper.initializeTimer(sound1EnvelopeControlRegister.lengthOfEnvelopeStep);

    // Initialize length
    this.lengthTimer = 64 - sound1LengthAndDutyCycleRegister.soundLength;
  }

  clockLength() {
    if (!sound1HighOrderFrequencyRegister.isContinuousSelection) {
      this.lengthTimer--;

      if (this.lengthTimer === 0) {
        this.isActive = false;
      }
    }
  }

  clockVolume() {
    this.volume = this.enveloper.clockVolume(this.volume, sound1EnvelopeControlRegister);
  }

  clockSweep() {
    if (this.sweepTimer > 0) {
      this.sweepTimer--;
    }

    if (this.sweepTimer === 0) {
      this.resetSweepTimer();

      if (this.isSweepEnabled && sweepControlRegister.sweepTime > 0) {
        const newFrequency = this.calculateNewSweepFrequency();

        if (newFrequency < 2048 && sweepControlRegister.sweepAmount > 0) {
          this.shadowFrequency = newFrequency;
          this.frequencyPeriod = ((2048 - newFrequency) * 4);
        }
      }
    }
  }

  private resetSweepTimer() {
    this.sweepTimer = sweepControlRegister.sweepTime;
    if (this.sweepTimer === 0) {
      this.sweepTimer = 8;
    }
  }

  private calculateNewSweepFrequency() {
    const { sweepAmount, isSweepIncrease } = sweepControlRegister;
    const shiftedFrequency = this.shadowFrequency >> sweepAmount;
    const shiftFrequencyBy = isSweepIncrease ? -shiftedFrequency : shiftedFrequency;

    const newFrequency = this.shadowFrequency + shiftFrequencyBy;

    if (newFrequency >= 2048) {
      this.isActive = false;
    }

    return newFrequency
  }

  getSample() {
    if (!sound1EnvelopeControlRegister.isDacEnabled || !this.isActive) {
      return 0;
    }

    const sample = this.dutyCycles[sound1LengthAndDutyCycleRegister.waveformDutyCycle][this.positionInDutyCycle];
    const volumeAdjustedSample = sample * this.volume;
    return volumeAdjustedSample / 15;
  }

  private getFrequencyPeriod() {
    const rawValue = memory.readWord(sound1LowOrderFrequencyRegister.offset) & 0b11111111111;
    return ((2048 - rawValue) * 4);
  }
}`);

</script>

<template>
  <BaseSlideTemplate>

  <template v-slot:header>
    Sound 1
  </template>

  <template v-slot:default>
    <div style="height: 78vh; ">
      <PrismEditor class="my-editor" style="width: 92vw; font-size: 0.7em;" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>