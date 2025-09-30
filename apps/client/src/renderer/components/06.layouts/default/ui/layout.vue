<script lang="ts" setup>
import { ThemeManager } from '~/components/02.shared/theme-manager'
</script>

<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <main class="main">
    <div class="main-content">
      <slot />
    </div>
  </main>

  <ThemeManager />
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
  overflow: hidden;
}
</style>
