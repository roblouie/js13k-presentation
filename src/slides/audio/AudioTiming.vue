<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      Audio Timing
    </template>

    <template v-slot:default>
      <div class="is-flex is-column-gap-3">
      <article class="message">
      <div class="message-header">Sample Timing</div>
        <div class="message-body">
      <ul>
        <li><b class="has-text-white">4,194,304 Hz</b> - CPU Speed </li>
        <li><b class="has-text-white">44,100 Hz</b> - Sample Rate </li>
        <li><b class="has-text-white">~95.1</b> - Cycles Per Sample</li>
      </ul>
        </div>
      </article>

        <article class="message">
          <div class="message-header">Property Timing</div>
          <div class="message-body">
            <ul>
              <li><b class="has-text-white">256 Hz</b> - Sound Length </li>
              <li><b class="has-text-white">64 Hz</b> - Envelope </li>
              <li><b class="has-text-white">128 Hz</b> - Sweep</li>
            </ul>
          </div>
        </article>
      </div>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  list-style: disclosure-closed;
  margin: 1em;
  font-size: 1.3em;
}

li {
  margin-bottom: 0.5em;
}
</style>