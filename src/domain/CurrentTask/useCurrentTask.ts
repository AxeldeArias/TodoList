import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { currentTaskSelector, setCurrentTask, updateCurrentTask } from './CurrentTaskSlice'
import { TaskItem } from '../Tasks/TaskModel'

const useCurrentTask = () => {
  const dispatch = useAppDispatch()
  const { currentTask } = useAppSelector(currentTaskSelector)

  const removeCurrentTask = () => {
    dispatch(setCurrentTask(null))
  }

  const _setCurrentTask = (item: Partial<TaskItem> | null | undefined = {
    description: '',
    title: '',
    estimate: '',
    state: 'PLANNED'
  }) => {
    dispatch(setCurrentTask(item))
  }

  const _updateCurrentTask = (item: Partial<TaskItem> | null) => {
    dispatch(updateCurrentTask(item))
  }

  return {
    currentTask,
    removeCurrentTask,
    setCurrentTask: _setCurrentTask,
    updateCurrentTask: _updateCurrentTask
  }
}

export default useCurrentTask
