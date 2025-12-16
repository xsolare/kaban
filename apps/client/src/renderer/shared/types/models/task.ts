export interface ITask {
  id: string
  projectId: string
  type: string
  key: string
  title: string
  labels: ILabel[]
  author: IUser
  asignee?: IUser
  epic: IEpic
  priority: IPriority
  createdAt: string
  updatedAt: string
  time: ITime
  description: string
}

interface IUser {
  id: string
  name: string
  avatar: string
}

interface IEpic {
  id: string
  color: string
  name: string
}

interface IPriority {
  id: string
  color: string
  name: string
}

interface ITime {
  spent: number
  estimate: number
  type: 'storyPoints' | 'days' | 'hours'
}

interface ILabel {
  id: string
  name: string
}
