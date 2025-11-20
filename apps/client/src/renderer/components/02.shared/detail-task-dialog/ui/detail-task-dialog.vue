<script setup lang="ts">
import { KitDialogWithClose } from '~/components/01.kit/kit-dialog-with-close/'

defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()
</script>

<template>
  <KitDialogWithClose
    :visible="visible"
    @update:visible="emit('update:visible', $event)"
  />
</template>
