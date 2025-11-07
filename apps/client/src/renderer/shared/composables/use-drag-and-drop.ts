interface DragAndDropOptions {
  onDrop: (payload: {
    itemId: string
    sourceContainerId: string
    targetContainerId: string
    newIndex: number
  }) => void
}

export function useDragAndDrop(options: DragAndDropOptions) {
  const draggedItemId = ref<string | null>(null)
  const sourceContainerId = ref<string | null>(null)

  function getDragAfterElement(container: HTMLElement, y: number): HTMLElement | null {
    const draggableElements = [...container.querySelectorAll('.task:not(.is-dragging)')] as HTMLElement[]

    const result = draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset)
          return { offset, element: child }
        else
          return closest
      },
      { offset: Number.NEGATIVE_INFINITY, element: null as HTMLElement | null },
    )
    return result.element
  }

  function removePlaceholder() {
    document.querySelectorAll('.task-placeholder').forEach(el => el.remove())
  }

  function startDrag(event: DragEvent, itemId: string, containerId: string) {
    draggedItemId.value = itemId
    sourceContainerId.value = containerId

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', itemId)
    }

    setTimeout(() => {
      (event.target as HTMLElement).classList.add('is-dragging')
    }, 0)
  }

  function endDrag() {
    const draggedElement = document.querySelector('.task.is-dragging')
    if (draggedElement)
      draggedElement.classList.remove('is-dragging')

    removePlaceholder()
    document.querySelectorAll('.column.is-dragover').forEach(el => el.classList.remove('is-dragover'))

    draggedItemId.value = null
    sourceContainerId.value = null
  }

  function onDragEnter(event: DragEvent) {
    (event.currentTarget as HTMLElement).classList.add('is-dragover')
  }

  function onDragLeave(event: DragEvent) {
    const currentTarget = event.currentTarget as HTMLElement
    if (!currentTarget.contains(event.relatedTarget as Node))
      currentTarget.classList.remove('is-dragover')
  }

  function onDragOver(event: DragEvent) {
    event.preventDefault()
    const columnElement = event.currentTarget as HTMLElement
    if (!columnElement)
      return

    removePlaceholder()

    const placeholder = document.createElement('div')
    placeholder.classList.add('task-placeholder')
    const draggedEl = document.querySelector('.is-dragging') as HTMLElement | null
    if (draggedEl)
      placeholder.style.height = `${draggedEl.clientHeight}px`

    const columnBody = columnElement.querySelector('.column-body') as HTMLElement | null
    if (!columnBody)
      return

    const afterElement = getDragAfterElement(columnBody, event.clientY)
    if (afterElement == null)
      columnBody.appendChild(placeholder)
    else
      columnBody.insertBefore(placeholder, afterElement)
  }

  function onDrop(event: DragEvent, targetContainerId: string) {
    event.preventDefault()
    const placeholder = document.querySelector('.task-placeholder')
    if (!placeholder || !draggedItemId.value || !sourceContainerId.value)
      return

    const tasksInColumn = Array.from(placeholder.parentElement?.children || [])
    const newIndex = tasksInColumn.indexOf(placeholder)

    options.onDrop({
      itemId: draggedItemId.value,
      sourceContainerId: sourceContainerId.value,
      targetContainerId,
      newIndex,
    })
  }

  return {
    startDrag,
    endDrag,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
  }
}
