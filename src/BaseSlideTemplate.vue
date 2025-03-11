<script setup lang="ts">
</script>

<template>
  <div class="wrapper">
    <div class="header">
      <slot name="header"></slot>
    </div>

    <div class="main">
      <slot></slot>
    </div>

  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
}

.header {
  text-align: center;
  font-size: 3em;
  font-weight: bold;
  color: white;
  letter-spacing: 0.01em;
}

.main {
  width: 100%;
  letter-spacing: 0.01em;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
}

a {
  color: white;
  text-decoration: none;
}
</style>
