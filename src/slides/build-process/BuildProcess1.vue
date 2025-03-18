<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      Build Process
    </template>

    <template v-slot:default>
      <div>
        <!--      <div class="is-flex is-flex-direction-column is-justify-content-space-evenly" style="height:100%">-->
        <p class="mb-6">Matrices can also translate, rotate, and skew vectors</p>
        <p class="mb-6">Multiplying one matrix by another will actually transform that matrix's transformations</p>
        <p>This means that by multiplying matrices, you can position things relative to a parent position.</p>
      </div>
      <!--      </div>-->
    </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>