<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {computed, ref, useTemplateRef} from "vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

const code = ref(`loop:
    DEC B
    JP NZ, loop`);

const selectedIndex = ref(-1);

function highlightTableCell(index: number, isHighlighted: boolean, event: MouseEvent) {
  const cell = document.querySelectorAll('td').item(index);
  selectedIndex.value = index;
  if (isHighlighted) {
    event.currentTarget!.classList.add('assembly-highlight')
    cell.classList.add('highlight');
  } else {
    event.currentTarget!.classList.remove('assembly-highlight')
    cell.classList.remove('highlight');
  }
}



</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      Assembly to Byte Code
    </template>

    <template v-slot:default>
      <div class="is-flex flex-column is-align-items-center" style="margin-bottom: 2em;">
        <div class="is-flex">
        <pre class="asm-text">
  <span @mouseover="highlightTableCell(0, true, $event)" @mouseleave="highlightTableCell(0, false, $event)"><span class="inst">LD</span> <span class="register">B</span></span>, <span @mouseover="highlightTableCell(1, true, $event)" @mouseleave="highlightTableCell(1, false, $event)" class="value">3</span>
<span class="marker">loop:</span>
  <span @mouseover="highlightTableCell(2, true, $event)" @mouseleave="highlightTableCell(2, false, $event)"><span class="inst">DEC</span> <span class="register">B</span></span>
  <span @mouseover="highlightTableCell(3, true, $event)" @mouseleave="highlightTableCell(3, false, $event)"><span class="inst">JP NZ</span></span>, <span @mouseover="highlightTableCell(4, true, $event);highlightTableCell(5, true, $event); " @mouseleave="highlightTableCell(4, false, $event);highlightTableCell(5, false, $event)"><span class="marker">loop</span></span>
        </pre>

          <div class="info-box">
            <img v-if="selectedIndex === 0" src="./load-immediate.png" style="filter: invert();" />
            <img v-if="selectedIndex === 2" src="./dec-r-instr.png" style="filter: invert();" />

            <div v-show="selectedIndex === 4 || selectedIndex === 5" class="address-display">
              0x<Transition name="in-left" appear><div class="hex-display" v-show="selectedIndex === 4 || selectedIndex === 5">01</div></Transition><Transition name="in-right" appear><div class="hex-display" v-show="selectedIndex === 4 || selectedIndex === 5">52</div></Transition>
            </div>

          </div>
        </div>

      </div>
      <table>
        <thead>
          <tr>
            <th>0x0150</th>
            <th>0x0151</th>
            <th>0x0152</th>
            <th>0x0153</th>
            <th>0x0154</th>
            <th>0x0155</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>06</td>
            <td>03</td>
            <td>05</td>
            <td>C2</td>
            <td>52</td>
            <td>01</td>
          </tr>
        </tbody>
      </table>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
table {
  text-align: center;
}

.asm-text {
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 1.3em;
  width: 40vw;
}

.marker {
  color: #e4e4e4;
}

.inst {
  color: #cccc00;
}

.register {
  color: #7027ff;
}

.value {
  color: #43df75;
}

table {
  width: 80%;
}

.highlight {
  background-color: #888842;
}

.assembly-highlight {
  background-color: #888842;
}

.info-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  width: 50vw;
}

.address-display {
  font-size: 2em;
}

.in-left-enter-active,
.in-left-leave-active,
.in-left-appear-active {
  transition: transform 1s ease, opacity 1s ease;
  transition-delay: 1s;

}
.in-left-enter-from,
.in-left-leave-to,
.in-left-appear-from {
  transform: translate(90px, 90px);
  opacity: 0;
}
.in-left-enter-to,
.in-left-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.in-right-enter-active,
.in-right-leave-active {
  transition-delay: 150ms;
  transition: transform 800ms ease, opacity 800ms ease;
}
.in-right-enter-from,
.in-right-leave-to {
  transform: translate(-90px, 90px);
  opacity: 0;
}
.in-right-enter-to,
.in-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}


.hex-display {
  display: inline-block;
  will-change: transform, opacity;
}
</style>