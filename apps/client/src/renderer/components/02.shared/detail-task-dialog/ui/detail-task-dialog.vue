<script setup lang="ts">
import type { ITask } from '~/shared/types/models/task'
import { KitDialogWithClose } from '~/components/01.kit/kit-dialog-with-close/'
import { useTask } from '~/components/03.domain/task/composables/use-task'

defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const { getTaskInfo } = useTask()
const content = ref<ITask | null>(null)

content.value = getTaskInfo()
</script>

<template>
  <KitDialogWithClose
    :visible="visible"
    :title="content?.title"
    :max-width="1440"
    @update:visible="emit('update:visible', $event)"
  >
    <div class="content">
      <div class="users">
        <div class="users-author">
          Автор: <b>{{ content?.author.name }}</b>
        </div>
        <div class="users-contractor">
          Исполнитель:
          <b v-if="content?.asignee">{{ content?.asignee.name }}</b>
          <span v-else>Не назначен</span>
        </div>
      </div>
      <div class="description" />
    </div>
    {{ content }}
  </KitDialogWithClose>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &-title {
    margin: 0;
  }
}

.description {
  border-top: 1px solid black;
  width: 100%;
}
</style>
