<script setup lang="ts">
import type { CalendarDateTime } from '@internationalized/date'
import type { ITask } from '~/shared/types/models/task'
import { Icon } from '@iconify/vue'
import { DateFormatter, getLocalTimeZone, parseDateTime } from '@internationalized/date'
import {
  DialogClose,
} from 'reka-ui'

import { KitAvatar } from '~/components/01.kit/kit-avatar'
import { KitDialogAside } from '~/components/01.kit/kit-dialog-aside/'
import { useTask } from '~/components/03.domain/task/composables/use-task'

defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const { getTaskInfo } = useTask()
const content = ref<ITask | null>(null)
const createdDateTime = ref<CalendarDateTime | null>(null)
const formatter = new DateFormatter('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

content.value = getTaskInfo()
createdDateTime.value = parseDateTime(content.value.createdAt)
const nativeDate = createdDateTime.value.toDate(getLocalTimeZone())
const formatted = formatter.format(nativeDate)
</script>

<template>
  <KitDialogAside
    :visible="visible"
    :title="content?.title"
    :max-width="800"
    @update:visible="emit('update:visible', $event)"
  >
    <template #header>
      <div class="header">
        <div class="header-content">
          <DialogClose as-child>
            <button class="close-button">
              <Icon class="icon" icon="mdi:close" />
            </button>
          </DialogClose>
          <div class="header-controls">
            <Icon class="icon" icon="mdi:timer-outline" />
            <Icon class="icon" icon="mdi:star-outline" />
            <Icon class="icon" icon="mdi:dots-vertical" />
          </div>
        </div>
      </div>
    </template>
    <div class="content">
      <h2 class="content-title">
        {{ content?.title }}
      </h2>
      <ul class="content-list">
        <li v-if="content?.createdAt" class="content-list-item">
          <Icon class="content-icon" icon="mdi:timer-plus-outline" />
          Создана: {{ formatted }}
        </li>
        <li v-if="content?.priority" class="content-list-item">
          <Icon class="content-icon" icon="mdi:checkbox-marked-circle-outline" />
          Приоритет: <span class="status" :style="`background-color: ${content.priority.color}`">{{ content.priority.name }}</span>
        </li>
        <li v-if="content?.labels.length" class="content-list-item">
          <Icon class="content-icon" icon="mdi:tag-outline" />
          Теги: <span v-for="label in content.labels" :key="label.id" class="status">{{ label.name }}</span>
        </li>
        <li v-if="content?.author" class="content-list-item">
          <Icon class="content-icon" icon="mdi:user-tie" />
          Автор: <KitAvatar :size="30" :name="content.author.name" />
        </li>
        <li v-if="content?.asignee" class="content-list-item">
          <Icon class="content-icon" icon="mdi:user" />
          Исполнитель: <KitAvatar :size="30" :name="content.asignee.name" />
        </li>
      </ul>
      <div class="description">
        <div class="description-content">
          <h3 class="description-title">
            Описание
          </h3>
          <div class="description-text">
            {{ content?.description || 'Здесь пока ничего нет' }}
          </div>
        </div>
      </div>
    </div>
  </KitDialogAside>
</template>

<style scoped lang="scss">
.header {
  border-bottom: 2px solid var(--border-secondary-color);
  padding: 16px;
  width: 100%;

  &-content {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  &-controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px;

  &-title {
    margin: 0;
  }

  &-list {
    padding: 0;
    margin: 0;
    list-style-type: none;

    &-item {
      margin-top: 10px;
      display: flex;
      align-items: center;
      gap: 5px;
      height: 30px;
    }
  }

  &-icon {
    width: 20px;
    height: 20px;
  }
}

.description {
  background-color: var(--bg-pressed-color);
  min-height: 150px;
  border-radius: 10px;

  &-content {
    padding: 15px;
  }

  &-title {
    margin: 0 0 10px 0;
  }

  &-text {
    color: var(--fg-tertiary-color);
  }
}

.status {
  background-color: var(--bg-tertiary-color);
  padding: 5px;
  border-radius: 10px;
}

.close-button {
  border: none;
  padding: 4px;
  cursor: pointer;
  color: var(--fg-secondary-color);
  border-radius: var(--r-full);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--bg-hover-color);
    color: var(--fg-accent-color);
  }
}

.icon {
  color: var(--fg-secondary-color);
  width: 27px;
  height: 27px;
  cursor: pointer;
}
</style>
