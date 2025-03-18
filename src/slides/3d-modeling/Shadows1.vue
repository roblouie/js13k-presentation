<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Directional Shadows
    </template>

    <template v-slot:default>
      <iframe id="play" allow="accelerometer;autoplay;camera;display-capture;encrypted-media;fullscreen;gamepad;geolocation;gyroscope;magnetometer;microphone;midi;payment;picture-in-picture;publickey-credentials-get;sync-xhr;usb;web-share;xr-spatial-tracking"
              src="/shadows2/shadow-shading.html" class="on full"></iframe>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  font-size: 1.7em;
  padding: 0 2em;
}

li {
  margin-bottom: 1em;
}

iframe {
  aspect-ratio: 16 / 9;
  width: auto;
  height: 100%;
}
</style>