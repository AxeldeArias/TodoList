import { createAsyncThunk } from '@reduxjs/toolkit'
import { CreateTaskRequest, LogicDeleteRequest, TaskItem } from './TaskModel'
import TaskService from './TaskService'

export const createTask = createAsyncThunk<
  TaskItem,
  CreateTaskRequest
>('createTask', (item) => {
  return TaskService.create(item)
})

export const getAllTasks = createAsyncThunk<
  TaskItem[],
  void
>('getAllTasks', () => {
  return TaskService.getAll()
})

export const updateTask = createAsyncThunk<
  TaskItem,
  Partial<TaskItem> & {id: string}
>('updateTask', (item) => {
  return TaskService.update(item)
})

export const deleteTask = createAsyncThunk<
  string,
  LogicDeleteRequest
>('deleteTask', ({ id }) => {
  return TaskService.logicDelete({ id })
})
