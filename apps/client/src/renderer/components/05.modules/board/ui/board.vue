<script setup lang="ts">
import type { IColumn, ITask } from '../models/types'
import { ref } from 'vue'

interface Props {
  tasks: [string, ITask][]
  columns: IColumn[]
}

const props = defineProps<Props>()

const tasks = ref(new Map<string, ITask>(props.tasks))
const columns = ref<IColumn[]>(props.columns)
const draggedTaskId = ref<string | null>(null)

function startDrag(taskId: string) {
  draggedTaskId.value = taskId
}

function onDrop(columnId: string) {
  if (!draggedTaskId.value)
    return

  for (const col of columns.value) {
    const index = col.taskIds.indexOf(draggedTaskId.value)
    if (index !== -1) {
      col.taskIds.splice(index, 1)
      break
    }
  }

  // Добавить в новую
  const targetColumn = columns.value.find(col => col.id === columnId)
  if (targetColumn && !targetColumn.taskIds.includes(draggedTaskId.value)) {
    targetColumn.taskIds.push(draggedTaskId.value)
  }

  draggedTaskId.value = null
}

function allowDrop(e: DragEvent) {
  e.preventDefault()
}
</script>

<template>
  <div class="board">
    <div
      v-for="column in columns"
      :key="column.id"
      class="column"
      @drop="onDrop(column.id)"
      @dragover="allowDrop"
    >
      <h3>{{ column.title }}</h3>
      <div
        v-for="taskId in column.taskIds"
        :key="taskId"
        class="task"
        draggable="true"
        @dragstart="startDrag(taskId)"
      >
        {{ tasks.get(taskId)?.title }}
      </div>
    </div>
    <div class="add-column-container">
      <button
        class="add-column-btn"
      >
        + Добавить колонку
      </button>
    </div>
  </div>
</template>

<style scoped>
.board {
  display: flex;
  gap: 16px;
  height: calc(100% - 100px);
}

.column {
  background: var(--bg-overlay-primary-color);
  padding: 12px;
  border-radius: 6px;
  min-width: 250px;
}

.task {
  background: white;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: grab;
}
</style>
