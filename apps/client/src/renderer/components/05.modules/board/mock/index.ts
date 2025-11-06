import type { IColumn, ITask } from '../models/types'

export const TASKS = [
  ['task1', { title: 'Задача 1' }],
  ['task2', { title: 'Задача 2' }],
  ['task3', { title: 'Задача 3' }],
] satisfies [string, ITask][]

export const COLUMNS = [
  { id: 'backlog', title: 'Sprint Backlog', taskIds: [] },
  { id: 'todo', title: 'To Do', taskIds: ['task1'] },
  { id: 'progress', title: 'In Progress', taskIds: ['task2'] },
  { id: 'done', title: 'Done', taskIds: ['task3'] },
] satisfies IColumn[]
