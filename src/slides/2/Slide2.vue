<script setup lang="ts">

import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Principals
    </template>

    <template v-slot:default>
      <ul>
        <li>Leverage the power of the browser. To push beyond perceived limitations, you have to master your platform. In this case, the platform is the browser.</li>
        <li>
          Even if you do this, there will always be limitations, especially in a 13kb game. Push until you find an acceptable set of limitations and then work within them.
        </li>
        <li>
          Limitations breed creativity. Use creative problem solving to find unlikely solutions, or to exploit a "limitation", turning it into a "feature".
        </li>
      </ul>
    </template>

  </BaseSlideTemplate>
</template>

<style scoped>
ul {
  font-size: 1.5em;
  padding: 0 2em;
}

li {
  margin-bottom: 1em;
}
</style>