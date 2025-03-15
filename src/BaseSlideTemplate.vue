<script setup lang="ts">
</script>

<template>
  <div class="wrapper">
    <div class="header">
      <div class="header-offset">
        <slot name="header"></slot>
      </div>
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
  height: 100vh;
  width: 100vw;
  align-items: center;
  padding: 2em;
}

.header {
  text-align: center;
  font-size: 3em;
  font-weight: bold;
  color: white;
  letter-spacing: 0.01em;
}

.header-offset {
  margin-top: -0.2em;
  margin-bottom: 0.2em;
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
