<script setup lang="ts">
import type { IBoardListItem } from '../models/types'

type Props = IBoardListItem

const props = defineProps<Props>()

function handleGoTo() {
  router.push(props.link)
}
</script>

<template>
  <div class="board-list-item" @click="handleGoTo">
    <h3>{{ title }}</h3>
  </div>
</template>

<style scoped lang="scss">
.board-list-item {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  min-height: 150px;
  cursor: pointer;
  background-color: var(--bg-tertiary-color);
  border-radius: 5px;

  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.2s ease;

  transform: translateY(0);

  border: 1px solid transparent;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      border-radius: inherit;
      transition: opacity 0.3s ease;
      z-index: 1;
    }

    &::before {
      opacity: 1;
    }

    h3 {
      position: relative;
      z-index: 2;
    }
  }

  position: relative;
}
</style>
