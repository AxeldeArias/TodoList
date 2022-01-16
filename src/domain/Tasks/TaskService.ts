import { AxiosResponse } from 'axios'
import Api from '../../config/api'
import { CreateTaskRequest, LogicDeleteRequest, TaskItem } from './TaskModel'

const create = async ({
  title,
  description,
  estimate
}: CreateTaskRequest): Promise<TaskItem> => {
  const { data } = await Api.post<CreateTaskRequest, AxiosResponse<TaskItem>>('/task', {
    title,
    description,
    estimate
  })

  return {
    ...data,
    id: title, // TODO: remove this line when unmock api
    title, // TODO: remove this line when unmock api
    description, // TODO: remove this line when unmock api
    state: 'PLANNED', // TODO: remove this line when unmock api
    estimate // TODO: remove this line when unmock api
  }
}

const update = async (task: Partial<TaskItem> & {id: string}): Promise<TaskItem> => {
  const { data } = await Api.put<TaskItem, AxiosResponse<TaskItem>>('/task', task)

  return {
    ...data,
    ...task // TODO: remove this line when unmock api
  }
}

const getAll = async (): Promise<TaskItem[]> => {
  const { data } = await Api.get<void, AxiosResponse<TaskItem[]>>('/tasks')
  return data
}

const logicDelete = async ({ id }: LogicDeleteRequest) => {
  await Api.delete<void, void>('/task')
  return id
}

const TaskService = {
  create,
  update,
  getAll,
  logicDelete
}

export default TaskService
