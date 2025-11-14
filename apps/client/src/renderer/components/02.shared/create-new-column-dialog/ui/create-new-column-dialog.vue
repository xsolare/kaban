<script setup lang="ts">
import KitBtn from '~/components/01.kit/kit-btn/ui/kit-btn.vue'
import { KitDialogWithClose } from '~/components/01.kit/kit-dialog-with-close'
import { KitInput } from '~/components/01.kit/kit-input'

defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'create'): void
}>()

const title = defineModel<string>('title', { required: true })
</script>

<template>
  <KitDialogWithClose
    title="Введите название нового столбца"
    :max-width="400"
    :visible="visible"
    @update:visible="emit('update:visible', $event)"
  >
    <KitInput
      v-model="title"
      placeholder="Введите название"
      size="sm"
    />
    <p class="hint">
      минимум 4 символа
    </p>
    <div class="buttons">
      <KitBtn variant="outlined" @click="emit('update:visible', false)">
        Отменить
      </KitBtn>
      <KitBtn :disabled="!(title.length > 3)" @click="emit('create')">
        Добавить
      </KitBtn>
    </div>
  </KitDialogWithClose>
</template>

<style scoped lang="scss">
.buttons {
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hint {
  font-size: smaller;
  margin: 0;
  color: var(--fg-secondary-color);
}
</style>
