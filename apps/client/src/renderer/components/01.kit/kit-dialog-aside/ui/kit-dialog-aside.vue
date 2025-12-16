<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'

interface Props {
  maxWidth?: number
  title?: string
  icon?: string
}

const { maxWidth = 700, title, icon } = defineProps<Props>()

const visible = defineModel<boolean>('visible', { required: true })

const maxWidthPx = computed(() => `${maxWidth}px`)
</script>

<template>
  <DialogRoot v-model:open="visible">
    <DialogPortal>
      <DialogOverlay class="dialog-overlay" />
      <DialogContent
        class="dialog-content-wrapper"
        :style="{ maxWidth: maxWidthPx }"
        @pointer-down-outside="(event) => {
          const originalEvent = event.detail.originalEvent
          const target = originalEvent.target as HTMLElement
          if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight)
            event.preventDefault()
        }"
      >
        <div class="dialog-header">
          <slot v-if="$slots.header" name="header" />
          <template v-else>
            <div class="title-container">
              <Icon v-if="icon" :icon="icon" class="title-icon" />
              <DialogTitle class="dialog-title">
                {{ title }}
              </DialogTitle>
            </div>
            <DialogClose as-child>
              <button class="close-button">
                <Icon icon="mdi:close" />
              </button>
            </DialogClose>
          </template>
        </div>
        <div class="dialog-body">
          <slot />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style lang="scss" scoped>
.dialog-overlay {
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
  z-index: 1000;

  &[data-state='open'] {
    animation: overlay-show 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  &[data-state='closed'] {
    animation: overlay-hide 200ms cubic-bezier(0.7, 0, 0.84, 0) forwards;
  }
}

.dialog-content-wrapper {
  position: fixed;
  padding: 0;
  top: 0;
  right: 0;
  height: 100vh;
  background-color: var(--bg-primary-color);
  border: 1px solid var(--border-secondary-color);
  border-radius: 8px 0 0 8px;
  box-shadow: var(--s-m);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: min(90vw, v-bind(maxWidthPx));
  max-width: v-bind(maxWidthPx);

  &:focus {
    outline: none;
  }

  &[data-state='open'] {
    animation: slide-in-right 250ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  &[data-state='closed'] {
    animation: slide-out-right 200ms cubic-bezier(0.7, 0, 0.84, 0) forwards;
  }

  @include media-down(sm) {
    position: fixed;
    right: 0;
    left: 0;

    &[data-state='open'] {
      animation: slide-up-mobile 250ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    &[data-state='closed'] {
      animation: slide-down-mobile 200ms cubic-bezier(0.7, 0, 0.84, 0) forwards;
    }
  }
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--fg-primary-color);
}

.title-icon {
  font-size: 1.25rem;
}

.dialog-title {
  font-size: 1.125rem;
  font-weight: 600;
}

.close-button {
  background: transparent;
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

.dialog-body {
  flex-grow: 1;
  overflow-y: auto;
}

@keyframes overlay-show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes overlay-hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slide-in-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-out-right {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

@keyframes slide-up-mobile {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-down-mobile {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}
</style>
