<script lang="ts" setup>
</script>

<template>
  <main class="main">
    <div class="main-content">
      <slot />
    </div>
  </main>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
}

.main-content {
  height: 100%;
  display: flex;
  flex: 1;
}
</style>
