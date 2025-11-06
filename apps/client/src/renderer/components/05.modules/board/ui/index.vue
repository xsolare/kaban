<script setup lang="ts">
import { COLUMNS, TASKS } from '../mock'
import Board from './board.vue'
</script>

<template>
  <div class="board-container">
    <h1>Название доски</h1>
    <Board :columns="COLUMNS" :tasks="TASKS" />
  </div>
</template>

<style scoped lang="scss">
.board-container {
  height: 100%;
  margin: 0 25px;
}
</style>
