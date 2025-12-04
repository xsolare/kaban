<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { KitBtn } from '~/components/01.kit/kit-btn'
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div class="header-left">
        <div class="logo" @click="router.push(AppRoutePaths.Boards.List)">
          <Icon icon="openmoji:boar" width="45" height="45" />
        </div>
      </div>
      <div class="header-right">
        <KitBtn variant="solid">
          Войти
        </KitBtn>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  width: 100%;

  &-content {
    width: 100%;
    height: 100%;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
