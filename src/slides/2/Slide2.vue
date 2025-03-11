<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Why a 13kb game?
    </template>

    <template v-slot:default>
      <ul>
        <li>That's the size they picked</li>
        <li>
          Automatically limits the scope of your game, forcing you to focus on core ideas
        </li>
        <li>
          Limitations bring innovation. Within the limited scope, what can you come up with...?
        </li>
      </ul>
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
</style>