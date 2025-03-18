<script setup lang="ts">
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

const code = `function playNote(note: number, enveloper: GainNode) {
  const frequency = 440 * 2 ** ((note-69) / 12);
  const oscillator = new OscillatorNode(audioContext);
  oscillator.frequency.value = frequency;
  oscillator.connect(enveloper);
  oscillator.start();
}`;
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Notes
    </template>

    <template v-slot:default>
      <div class="editor-result-horizontal is-align-items-center">

      <PrismEditor class="my-editor" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />

      <table style="width: 15em;">
        <tr><td>64</td> 	<td>E4</td> <td>329.63</td></tr>
        <tr><td>63</td> 	<td>D#4/Eb4</td>	<td>311.13</td></tr>
        <tr><td>62</td> 	<td>D4</td> <td>293.66</td></tr>
        <tr><td>61</td> 	<td>C#4/Db4</td> <td>277.18</td></tr>
        <tr><td>60</td> 	<td>C4</td>	<td>261.63</td></tr>
        <tr><td>59</td> 	<td>B3</td> <td>246.94</td></tr>
        <tr><td>58</td> 	<td>A#3/Bb3</td> <td>233.08</td></tr>
        <tr><td>57</td> 	<td>A3</td> <td>220.00</td></tr>
        <tr><td>56</td> 	<td>G#3/Ab3</td> <td>207.65</td></tr>
        <tr><td>55</td> 	<td>G3</td> <td>196.00</td></tr>
        <tr><td>54</td> 	<td>F#3/Gb3</td> <td>185.00</td></tr>
        <tr><td>53</td> 	<td>F3</td> <td>174.61</td></tr>
        <tr><td>52</td> 	<td>E3</td> <td>164.81</td></tr>
      </table>
      </div>

    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
.my-editor {
  height: 13em;
}
</style>