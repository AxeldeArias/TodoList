import { configureStore } from '@reduxjs/toolkit'
import { currentTaskSlice } from './CurrentTask/CurrentTaskSlice'
import { errorSlice } from './Error/ErrorSlice'
import { successSlice } from './Success/SuccessSlice'
import { tasksSlice } from './Tasks/TaskSlice'

export const reducer = {
  tasks: tasksSlice.reducer,
  currentTask: currentTaskSlice.reducer,
  error: errorSlice.reducer,
  success: successSlice.reducer
}

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
