import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { TaskItem } from '../Tasks/TaskModel'

type State = {
 currentTask: null | Partial<TaskItem>
}

const initialState: State = {
  currentTask: null
}

export const currentTaskSlice = createSlice({
  name: 'currentTask',
  initialState,
  reducers: {
    setCurrentTask (state, { payload }: PayloadAction<Partial<TaskItem> | null>) {
      state.currentTask = payload
    },
    updateCurrentTask (state, { payload }: PayloadAction<Partial<TaskItem> | null>) {
      if (state.currentTask) {
        state.currentTask = { ...state.currentTask, ...payload }
      }
    }
  }
})

export const { setCurrentTask, updateCurrentTask } = currentTaskSlice.actions
export const currentTaskSelector = (state: RootState) => state.currentTask
