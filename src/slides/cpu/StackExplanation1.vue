<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import StackDemo from "@/slides/cpu/StackDemo.vue";
</script>

<template>
  <BaseSlideTemplate>
    <template v-slot:header>
      SP (Stack Pointer)
    </template>

    <template v-slot:default>
      <div class="is-flex-direction-row is-flex is-column-gap-8">
      <pre>
0x014C    CALL 0x3E2A
0x0150    DEC B
...
0x3E27    CALL 0xC123
0x3E2A    RET
...
0xC120    CALL 0xD340
0xC123    RET
...
0xD340    LD B, 5
0xD342    RET
      </pre>

      <StackDemo />
      </div>
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>