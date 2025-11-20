<script setup lang="ts">
import type { IColumn, ITask } from '../models/types'
import { useDragAndDrop } from '~/shared/composables/use-drag-and-drop'
import Task from './task.vue'

interface Props {
  tasks: [string, ITask][]
  columns: IColumn[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'openDetailPage', id: string): void
}>()

// eslint-disable-next-line unused-imports/no-unused-vars
const tasks = ref(new Map<string, ITask>(props.tasks))
const columns = ref<IColumn[]>(props.columns)
const isNewColumnDialogOpen = defineModel<boolean>('is-new-column-dialog')
const isDetailTaskOpen = defineModel<boolean>('is-detail-task-open')

function openDetailPage(id: string) {
  emit('openDetailPage', id)
}

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
  <div class="board-wrapper">
    <div class="column-headers">
      <div
        v-for="column in columns"
        :key="column.id"
        class="column-header-item"
      >
        {{ column.title }}
      </div>
      <div class="add-column-placeholder" />
    </div>

    <div class="board-content">
      <div
        v-for="column in columns"
        :key="column.id"
        class="column"
        @dragover="onDragOver"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @drop="onDrop($event, column.id)"
      >
        <div class="column-body">
          <Task
            v-for="taskId in column.taskIds"
            :key="taskId"
            draggable="true"
            :="tasks.get(taskId)!"
            @dragstart="startDrag($event, taskId, column.id)"
            @dragend="endDrag"
            @open-detail-dialog="isDetailTaskOpen = true"
            @open-detail-page="openDetailPage"
          />
        </div>
      </div>

      <div class="add-column-container" @click="isNewColumnDialogOpen = true">
        <button class="add-column-btn">
          + Добавить колонку
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.board-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: auto;
}

.column-headers {
  display: flex;
  gap: 16px;
  padding: 12px;
  background: var(--bg-primary-color);
  position: sticky;
  top: 0;
  z-index: 20;
  padding-bottom: 12px;

  .column-header-item {
    min-width: 280px;
    max-width: 280px;
    font-weight: 600;
    color: var(--fg-primary-color);
    padding: 0 4px;
  }

  .add-column-placeholder {
    width: 280px;
    visibility: hidden;
  }
}

.board-content {
  display: flex;
  gap: 16px;
  padding: 0 12px 16px;
  flex: 1;

  .column {
    background: var(--bg-overlay-primary-color);
    padding: 12px;
    border-radius: 8px;
    min-width: 280px;
    max-width: 280px;
    display: flex;
    flex-direction: column;

    .column-body {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  .add-column-container {
    min-width: 280px;
    max-width: 280px;
    align-self: flex-start;
    padding-top: 12px;
    height: 100%;
    padding: 12px;
    border: 2px dashed var(--bg-overlay-primary-color);
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 0.3s ease;

    &:hover {
      border: 2px dashed var(--border-accent-color);
    }
  }
}
</style>
