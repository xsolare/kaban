export interface ITask {
  id: string
  projectId: string
  title: string
  author: IAuthor
  epic: IEpic
  priority: IPriority
}

export interface IColumn {
  id: string
  title: string
  taskIds: string[]
}

interface IAuthor {
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
