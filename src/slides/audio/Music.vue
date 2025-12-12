<script setup lang="ts">
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = `function playSong() {
  const playSong = () => {
    for (const note of song) {
      audioPlayer.playNote(
        audioContext.currentTime + note[2], note[1],
        note[4] - 10,
        [violin, frenchHorn][note[0]],
        audioContext.currentTime + note[2] + note[3]
      );
    }
  }
  playSong();

  // Song is 6 seconds long, make it repeat until we stop it
  songInterval = setInterval(playSong, 6000);
}`;

const defaults: InstrumentData = {output:0,waveform:"sine",tuneFactor:1,frequency:0,volume:0.5,attack:0,hold:0.01,decay:0.01,sustain:0,release:0.05,pitchBend:1,pitchBendSpeed:1,volumeKeyTracking:0}
const violin: InstrumentData[] = [{ ...defaults, waveform:"sawtooth",volume:0.4,attack:0.1,decay:0.2,},{ ...defaults, waveform:"sine",volume:5,decay:0.2,sustain:0.2,output:1,}];
const frenchHorn: InstrumentData[] = [{ ...defaults, waveform:"square",volume:0.1,attack:0.1,decay:0.5,sustain:0.5,release:0.08,},{ ...defaults, waveform:"sine",volume:1,decay:0.1,sustain:4,output:1,}];

const song = expandSong('2P(322P*322P,322P.322Q0322P2322P4322Q6322R8322R:322R<322R>322S@322RB322RD322SF322MH322MJ322ML322MN322NP322MR322MT322NV3235(B<32(B<3/(B<3/8B<3,8B<3)8B<36HB<33HB<30HB<');

const audioPlayer = new SimplestMidiRev2();
audioPlayer.volume_.connect(compressor);

let songInterval = 0;

const isPlaying = ref(false);

function expandSong(noteString: string) {
  const notesets = noteString.match(/.{5}/g)!;
  return notesets.map(noteset => ([noteset.charCodeAt(0) - 50, noteset.charCodeAt(1), (noteset.charCodeAt(2) - 40) / 8, (noteset.charCodeAt(3) - 50) / 8, (noteset.charCodeAt(4) - 20)]));
}

function playSong() {
  const playSong = () => {
    for (const note of song) {
      audioPlayer.playNote(audioContext.currentTime + note[2], note[1],  note[4] - 10, [violin, frenchHorn][note[0]], audioContext.currentTime + note[2] + note[3]);
    }
  }
  audioPlayer.volume_.gain.cancelScheduledValues(audioContext.currentTime);
  audioPlayer.volume_.gain.setValueAtTime(1, audioContext.currentTime);
  playSong();
  isPlaying.value = true;
  songInterval = setInterval(playSong, 6000);
}

function stopSong() {
  audioPlayer.volume_.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
  clearInterval(songInterval);
  isPlaying.value = false;
}

function handleClick() {
  if (isPlaying.value) {
    stopSong();
  } else {
    playSong();
  }
}


</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Music
    </template>

    <template v-slot:default>
      <div class="editor-result-horizontal is-align-items-center">

      <PrismEditor class="my-editor" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />

      <div>
        <button @click="handleClick()">{{ isPlaying ? 'Stop' : 'Play' }}</button>
      </div>
      </div>

    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
.my-editor {
  font-size: 0.8em;
  height: 28em;
}
</style>