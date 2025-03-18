<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Game Development
    </template>

    <template v-slot:default>
      <ul>
        <li>Requires great UX. A UX so good, people keep interacting with it just because they enjoy it.</li>
        <li>
          Performance matters. Many games run at 60 fps, this means you have 16.6 ms to do everything.
        </li>
        <li>
          Requires different methods of problem solving than general web development. Usually with more math.
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