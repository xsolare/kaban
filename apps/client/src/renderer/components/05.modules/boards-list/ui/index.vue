<script setup lang="ts">
import { MOCK_DATA } from '../mock'
import BoardListItem from './boards-list-item.vue'
</script>

<template>
  <div class="boards-list-container">
    <h1>Доски</h1>
    <section class="wrapper">
      <BoardListItem v-for="item in MOCK_DATA" :key="item.id" :="item" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.boards-list-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 20px;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  width: 100%;
}
</style>
