import type { ITask } from '~/shared/types/models/task'
import { TASK } from '../mock'

export function useTask() {
  function getTaskInfo(): ITask {
    return TASK
  }

  return {
    getTaskInfo,
  }
}
