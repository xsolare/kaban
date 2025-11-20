<!-- eslint-disable vue/custom-event-name-casing -->
<script setup lang="ts">
import type { ITask } from '../models/types'
import { KitAvatar } from '~/components/01.kit/kit-avatar'

type Props = ITask

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'openDetailDialog'): void
  (e: 'openDetailPage', id: string): void
}>()

function openDetailPage(e: Event) {
  e.stopPropagation()
  emit('openDetailPage', props.id)
}
</script>

<template>
  <div class="task" @click="emit('openDetailDialog')">
    <div class="task-header">
      <h5 class="task-header-id">
        {{ projectId }}
      </h5>
      <span class="task-header-title" @click="openDetailPage">{{ title }}</span>
    </div>
    <!-- <div class="task-body">
    </div> -->
    <div class="task-footer">
      <KitAvatar :size="25" :name="author.name" />
      <div class="priority">
        <div class="priority-color" />
        <div class="priority-name">
          {{ priority.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.task {
  display: flex;
  flex-direction: column;
  gap: 10px;
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

  border-left: 5px solid v-bind('props.epic.color');

  &-header {
    &-id {
      margin: 0 0 10px 0;
    }

    &-title {
      &:hover {
        border-bottom: 1px solid var(--border-primary-color);
        cursor: pointer;
      }
    }
  }

  &-footer {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .priority {
    display: flex;
    align-items: center;
    gap: 5px;

    &-color {
      background-color: v-bind('props.priority.color');
      width: 15px;
      height: 15px;
      border-radius: 50%;
    }
  }

  &:active {
    cursor: grabbing;
  }

  &.is-dragging {
    opacity: 0.4;
    transform: rotate(1deg) scale(1.05);
    box-shadow: var(--s-xl);
  }
}

.kit-avatar {
  cursor: pointer;
}
</style>
