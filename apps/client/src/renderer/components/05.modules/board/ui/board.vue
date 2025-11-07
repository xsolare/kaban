<script setup lang="ts">
import type { IColumn, ITask } from '../models/types'
import { useDragAndDrop } from '~/shared/composables/use-drag-and-drop'

interface Props {
  tasks: [string, ITask][]
  columns: IColumn[]
}

const props = defineProps<Props>()

const tasks = ref(new Map<string, ITask>(props.tasks))
const columns = ref<IColumn[]>(props.columns)

function handleDrop(payload: {
  itemId: string
  sourceContainerId: string
  targetContainerId: string
  newIndex: number
}) {
  const { itemId, sourceContainerId, targetContainerId, newIndex } = payload

  const sourceColumn = columns.value.find(col => col.id === sourceContainerId)
  const targetColumn = columns.value.find(col => col.id === targetContainerId)

  if (!sourceColumn || !targetColumn)
    return

  const taskIndex = sourceColumn.taskIds.indexOf(itemId)
  if (taskIndex > -1)
    sourceColumn.taskIds.splice(taskIndex, 1)

  targetColumn.taskIds.splice(newIndex, 0, itemId)
}

const {
  startDrag,
  endDrag,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
} = useDragAndDrop({ onDrop: handleDrop })
</script>

<template>
  <div class="board">
    <div
      v-for="column in columns"
      :key="column.id"
      class="column"
      @dragover="onDragOver"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @drop="onDrop($event, column.id)"
    >
      <h3>{{ column.title }}</h3>
      <div class="column-body">
        <div
          v-for="taskId in column.taskIds"
          :key="taskId"
          class="task"
          draggable="true"
          @dragstart="startDrag($event, taskId, column.id)"
          @dragend="endDrag"
        >
          {{ tasks.get(taskId)?.title }}
        </div>
      </div>
    </div>
    <div class="add-column-container">
      <button class="add-column-btn">
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
  overflow-x: auto;
  padding-bottom: 16px;
}

.column {
  background: var(--bg-overlay-primary-color);
  padding: 12px;
  border-radius: 8px;
  min-width: 280px;
  max-width: 280px;
  display: flex;
  flex-direction: column;
  transition: background-color 0.2s ease;
}

.column h3 {
  font-weight: 600;
  padding: 0 4px 12px;
  color: var(--fg-primary-color);
}

.column-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.column.is-dragover {
  background-color: var(--bg-accent-overlay-color);
}

.task {
  background: var(--bg-primary-color);
  padding: 12px;
  border-radius: 6px;
  box-shadow: var(--s-s);
  cursor: grab;
  color: var(--fg-secondary-color);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.task:active {
  cursor: grabbing;
}

.task.is-dragging {
  opacity: 0.4;
  transform: rotate(1deg) scale(1.05);
  box-shadow: var(--s-xl);
}

:deep(.task-placeholder) {
  background: transparent;
  border: 2px dashed var(--border-accent-color);
  border-radius: 6px;
}
</style>
