import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { combineReducers, Reducer } from 'redux'
import { reducer, RootState } from '../domain/store'
import { currentTaskState } from '../domain/CurrentTask/CurrentTaskSlice'
import { taskSliceState } from '../domain/Tasks/TaskSlice'
import { successState } from '../domain/Success/SuccessSlice'
import { errorState } from '../domain/Error/ErrorSlice'
const mockStore = configureStore([thunk])

export const mockStoreWithGetState = (
  reducer: Reducer,
  initialStoreValue: RootState
) => {
  const createState = (initialState: RootState) => (actions: any) =>
    actions.reduce(reducer, initialState)
  return mockStore(createState(initialStoreValue))
}

export const getMockStore = () => {
  return mockStoreWithGetState(
    combineReducers({ ...reducer })
    , {
      currentTask: currentTaskState,
      tasks: taskSliceState,
      success: successState,
      error: errorState
    })
}
