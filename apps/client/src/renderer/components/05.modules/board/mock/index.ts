import type { IColumn } from '../models/types'
import type { ITask } from '~/shared/types/models/task'
import { v4 as uuidv4 } from 'uuid'

export const TASKS = [
  ['task1', {
    id: uuidv4(),
    projectId: 'KBN-1',
    title: 'Задача 1',
    author: {
      id: uuidv4(),
      name: 'Корнилов Иван Алексеевич',
      avatar: '',
    },
    epic: {
      id: uuidv4(),
      color: '#3574F0',
      name: 'task 1 epic',
    },
    priority: {
      id: uuidv4(),
      color: '#FF0000',
      name: 'Критическая',
    },
    createdAt: '',
    updatedAt: '',
    key: '',
    labels: [],
    time: {
      estimate: 1,
      spent: 3,
      type: 'hours',
    },
    type: '',
  }],
  ['task2', {
    id: uuidv4(),
    projectId: 'KBN-2',
    title: 'Задача 2',
    author: {
      id: uuidv4(),
      name: 'Жуков Даниил Романович',
      avatar: '',
    },
    epic: {
      id: uuidv4(),
      color: '#FED277',
      name: 'task 2 epic',
    },
    priority: {
      id: uuidv4(),
      color: '#00FF00',
      name: 'Обычная',
    },
    createdAt: '',
    updatedAt: '',
    key: '',
    labels: [],
    time: {
      estimate: 1,
      spent: 3,
      type: 'hours',
    },
    type: '',
  }],
  ['task3', {
    id: uuidv4(),
    projectId: 'KBN-3',
    title: 'Задача 3',
    author: {
      id: uuidv4(),
      name: 'Прытков Максим Алексеевич',
      avatar: '',
    },
    epic: {
      id: uuidv4(),
      color: '#89C398',
      name: 'Task 3 epic',
    },
    priority: {
      id: uuidv4(),
      color: '#FFFF00',
      name: 'Важная',
    },
    createdAt: '',
    updatedAt: '',
    key: '',
    labels: [],
    time: {
      estimate: 1,
      spent: 3,
      type: 'hours',
    },
    type: '',
  }],
] satisfies [string, ITask][]

export const COLUMNS = [
  { id: 'backlog', title: '🚧 Sprint Backlog', taskIds: ['task1'] },
  { id: 'progress', title: '🎱 In Progress', taskIds: ['task2'] },
  { id: 'done', title: '✅ Done', taskIds: ['task3'] },
] satisfies IColumn[]
