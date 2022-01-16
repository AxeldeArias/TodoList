export type TaskItem = {
  id: string,
  title: string,
  description: string,
  state: 'IN_PROGRESS' | 'PLANNED' | 'COMPLETED',
  estimate: string,
}

export type CreateTaskRequest = {
  title: string,
  description: string,
  estimate: string
}

export type LogicDeleteRequest = {
  id: string,
}
