<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      JS13K Overview
    </template>

    <template v-slot:default>
      <ul>
        <li>
          JS13K Is a game development competition where your game must run in the browser,
          and your game must be 13kb or less in size.
        </li>
        <li>
          You must submit a single zip file with your entire game. When unzipped it must run
          without an internet connection (no sneakily loading data behind the scenes).
        </li>
        <li>
          Each year there is a different theme you must follow.
        </li>
        <li>You get 30 days to complete the game</li>
      </ul>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  font-size: 1.5em;
}
</style>