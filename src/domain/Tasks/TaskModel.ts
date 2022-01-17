export type TaskItem = {
  id: string,
  title: string,
  description: string,
  state: 'IN_PROGRESS' | 'PLANNED' | 'COMPLETED',
  estimate: number,
}

export type CreateTaskRequest = {
  title: string,
  description: string,
  estimate: number
}

export type LogicDeleteRequest = {
  id: string,
}
