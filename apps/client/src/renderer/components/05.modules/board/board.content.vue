<script setup lang="ts">
import { COLUMNS, TASKS } from './mock'
import Board from './ui/board.vue'
</script>

<template>
  <div class="board-container">
    <div class="board-header">
      <h1>Название доски</h1>
    </div>
    <Board :columns="COLUMNS" :tasks="TASKS" />
  </div>
</template>

<style scoped lang="scss">
.board-container {
  height: 100%;
  margin: 0 25px;
}
</style>
