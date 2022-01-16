import { createTask, deleteTask, getAllTasks, updateTask } from './TaskReducers'
import { tasksSelector } from './TaskSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import useCurrentTask from '../CurrentTask/useCurrentTask'
import useError from '../Error/useAppError'
import useSuccess from '../Success/useSuccess'

const useTasksService = () => {
  const dispatch = useAppDispatch()
  const { loading, tasks } = useAppSelector(tasksSelector)

  const { openErrorModal } = useError()
  const { openSuccessModal } = useSuccess()

  const { currentTask, removeCurrentTask } = useCurrentTask()

  const taskActionCallback = (
    {
      wasFulfilled,
      successModalMessage,
      errorModalMessage
    }: {
      wasFulfilled: boolean,
      successModalMessage?: string,
      errorModalMessage?: string
    }) => {
    removeCurrentTask()
    if (wasFulfilled) {
      openSuccessModal(successModalMessage)
    } else {
      openErrorModal(errorModalMessage)
    }
  }

  const handleCreateTask = async () => {
    const result = await dispatch(createTask({
      title: currentTask?.title ?? '',
      description: currentTask?.description ?? '',
      estimate: 'sin'
    }))

    taskActionCallback({
      wasFulfilled: createTask.fulfilled.match(result),
      errorModalMessage: 'Error creating task',
      successModalMessage: 'Task created'
    })
  }

  const handleUpdateTask = async () => {
    if (!currentTask) {
      return
    }
    const id = currentTask?.id
    if (id) {
      const result = await dispatch(updateTask({
        id,
        ...currentTask
      }))

      taskActionCallback({
        wasFulfilled: updateTask.fulfilled.match(result),
        errorModalMessage: 'Error updating task',
        successModalMessage: 'Task updated'
      })
    }
  }

  const handleDeleteTask = async () => {
    const id = currentTask?.id
    if (id) {
      const result = await dispatch(deleteTask({
        id
      }))

      taskActionCallback({
        wasFulfilled: deleteTask.fulfilled.match(result),
        errorModalMessage: 'Error deleting task',
        successModalMessage: 'Task deleted'
      })
    }
  }

  const handleGetTasks = () => {
    dispatch(getAllTasks())
  }

  return {
    loading,
    tasks,
    handleGetTasks,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask
  }
}

export default useTasksService
