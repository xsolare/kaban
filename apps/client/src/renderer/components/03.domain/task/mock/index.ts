import type { ITask } from '~/shared/types/models/task'
import { v4 as uuidv4 } from 'uuid'

export const TASK = {
  id: uuidv4(),
  author: {
    id: uuidv4(),
    name: 'Прибытков Максим Алексеевич',
    avatar: '',
  },
  asignee: {
    id: uuidv4(),
    name: 'Платков Максим Алексеевич',
    avatar: '',
  },
  epic: {
    id: uuidv4(),
    color: '#FED277',
    name: 'task 2 epic',
  },
  priority: {
    id: uuidv4(),
    color: '#80ff80',
    name: 'Обычная',
  },
  projectId: 'KBN-2',
  title: 'Моковая задача',
  createdAt: '2023-10-11T12:30:00',
  updatedAt: '2023-10-11T12:30:00',
  time: {
    spent: 1,
    estimate: 3,
    type: 'hours',
  },
  key: '',
  type: '',
  labels: [{
    id: uuidv4(),
    name: 'task',
  }, {
    id: uuidv4(),
    name: 'mock',
  }],
  description: '',
} satisfies ITask
