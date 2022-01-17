import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import TodoListApp from '../TodoListApp'
import { Provider } from 'react-redux'
import { getMockStore } from '../../../utils/tests'

export const renderTodoListScreen = () => {
  const store = getMockStore()

  const screen = render(
    <Provider store={store}>
      <TodoListApp />
    </Provider>
  )

  const createTask = async ({ title }: {title:string}) => {
    fireEvent.press(screen.getByTestId('AddNewTaskButton'))

    expect(screen.getByTestId('TaskDetailModalID').props.visible).toBe(true)

    fireEvent.changeText(screen.getByTestId('TaskDetailModal.titleInput'), title)

    fireEvent.press(screen.getByTestId('TaskDetailModal.createTask'))
  }

  const finishLoading = async () => {
    expect(screen.queryByTestId('Loading')).toBeTruthy()

    await waitFor(() => {
      expect(screen.queryByTestId('Loading')).toBeNull()
    })
  }

  const updateTask = ({ newTitle }: {newTitle: string}) => {
    expect(screen.getByTestId('TaskDetailModalID').props.visible).toBe(false)

    fireEvent.press(screen.getByTestId('task-1'))
    expect(screen.getByTestId('TaskDetailModalID').props.visible).toBe(true)

    fireEvent.changeText(screen.getByTestId('TaskDetailModal.titleInput'), newTitle)

    fireEvent.press(screen.getByTestId('TaskDetailModal.updateTask'))
  }

  const deleteTask = () => {
    expect(screen.getByTestId('TaskDetailModalID').props.visible).toBe(false)

    fireEvent.press(screen.getByTestId('task-1'))
    expect(screen.getByTestId('TaskDetailModalID').props.visible).toBe(true)

    fireEvent.press(screen.getByTestId('TaskDetailModal.deleteTask'))
  }

  return {
    screen,
    utils: {
      finishLoading,
      createTask,
      updateTask,
      deleteTask
    }
  }
}
