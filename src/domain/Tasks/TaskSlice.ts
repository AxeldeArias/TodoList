import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { TaskItem } from './TaskModel'
import { createTask, deleteTask, getAllTasks, updateTask } from './TaskReducers'

type State = {
  tasks: TaskItem[],
  loading: boolean,
  gettingAllTasks: boolean,
  error: string,
}

export const taskSliceState: State = {
  tasks: [],
  loading: false,
  gettingAllTasks: true,
  error: ''
}

export const tasksSlice = createSlice({
  name: 'task',
  initialState: taskSliceState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllTasks.pending, state => {
        state.gettingAllTasks = true
      })
      .addCase(getAllTasks.fulfilled, (state, { payload }) => {
        return {
          ...state,
          tasks: payload,
          gettingAllTasks: false
        }
      })
      .addCase(getAllTasks.rejected, state => {
        state.gettingAllTasks = false
      })
      .addCase(createTask.pending, state => {
        state.loading = true
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        return {
          ...state,
          tasks: [...state.tasks, payload],
          loading: false
        }
      })
      .addCase(createTask.rejected, state => {
        state.loading = false
      })
      .addCase(updateTask.pending, state => {
        state.loading = true
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        state.tasks = state.tasks.map((item) => item.id === payload.id ? payload : item)
        state.loading = false
      })
      .addCase(updateTask.rejected, state => {
        state.loading = false
      })
      .addCase(deleteTask.pending, state => {
        state.loading = true
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.tasks = state.tasks.filter((item) => item.id !== payload)
        state.loading = false
      })
      .addCase(deleteTask.rejected, state => {
        state.loading = false
      })
  }
})

export const tasksSelector = (state: RootState) => state.tasks
