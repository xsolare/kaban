<script setup lang="ts">
import { CreateNewColumnDialog } from '~/components/02.shared/create-new-column-dialog'
import { DetailTaskDialog } from '~/components/02.shared/detail-task-dialog'
import { COLUMNS, TASKS } from './mock'
import Board from './ui/board.vue'

const router = useRouter()

const isNewColumnDialogOpen = ref<boolean>(false)
const isDetailTaskOpen = ref<boolean>(false)
const newColumnTitle = ref<string>('')

function handleCreate() {
  // eslint-disable-next-line no-console
  console.log('on creating new column >>> ', newColumnTitle.value)
  isNewColumnDialogOpen.value = false
  newColumnTitle.value = ''
}

function handleOpenDetailPage(id: string) {
  router.push(AppRoutePaths.Task.Detail(id))
}
</script>

<template>
  <div class="board-container">
    <div class="board-header">
      <h1>Название доски</h1>
    </div>
    <Board
      v-model:is-new-column-dialog="isNewColumnDialogOpen"
      v-model:is-detail-task-open="isDetailTaskOpen"
      :columns="COLUMNS"
      :tasks="TASKS"
      @open-detail-page="handleOpenDetailPage"
    />
    <CreateNewColumnDialog
      v-model:visible="isNewColumnDialogOpen"
      v-model:title="newColumnTitle"
      @create="handleCreate"
    />
    <DetailTaskDialog
      v-model:visible="isDetailTaskOpen"
    />
  </div>
</template>

<style scoped lang="scss">
.board-container {
  height: 100%;
  margin: 0 25px;
}
</style>
