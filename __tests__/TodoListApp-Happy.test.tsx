import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import TodoListApp from '../src/TodoListApp'
import { Provider } from 'react-redux'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { defaultConfig } from '../src/config/api'
import { getMockStore } from '../src/utils/tests'

const defaultHandlers = [
  rest.get(`${defaultConfig.baseURL}/tasks`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: '1',
          title: 'Study',
          description: 'Study maths',
          state: 'IN_PROGRESS',
          estimate: '12/16/22'
        }
      ])
    )
  }),
  rest.post(`${defaultConfig.baseURL}/task`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ id: '123' })
    )
  }),
  rest.put(`${defaultConfig.baseURL}/task`, (_req, res, ctx) => {
    return res(
      ctx.status(200)
    )
  }),
  rest.delete(`${defaultConfig.baseURL}/task`, (_req, res, ctx) => {
    return res(
      ctx.status(200)
    )
  })
]
const server = setupServer(...defaultHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('When a user has tasks', () => {
  test('should see them', async () => {
    const { screen } = renderTodoListScreen()
    expect(screen.queryByTestId('Loading')).toBeTruthy()

    await waitFor(() => {
      expect(screen.queryByTestId('Loading')).toBeNull()
    })
    expect(screen.getByTestId('TaskDetailModalID').props.visible).toBe(false)

    fireEvent.press(screen.getByTestId('task-1'))

    await waitFor(() => {
      expect(screen.getByTestId('TaskDetailModalID').props.visible).toBe(true)
    })

    expect(screen.getByTestId('TaskDetailModal.titleInput').props.value).toBe('Study')
    expect(screen.getByTestId('TaskDetailModal.description').props.value).toBe('Study maths')
  })
})

describe('When a user creates a task', () => {
  test('should see a success modal', async () => {
    const taskToCreate = 'New Task'
    const { screen } = renderTodoListScreen()

    expect(screen.queryByTestId('Loading')).toBeTruthy()

    await waitFor(() => {
      expect(screen.queryByTestId('Loading')).toBeNull()
    })
    expect(screen.getByTestId('TaskDetailModalID').props.visible).toBe(false)

    expect(screen.queryByText(taskToCreate)).toBeFalsy()

    fireEvent.press(screen.getByTestId('AddNewTaskButton'))

    expect(screen.getByTestId('TaskDetailModalID').props.visible).toBe(true)

    fireEvent.changeText(screen.getByTestId('TaskDetailModal.titleInput'), taskToCreate)

    fireEvent.press(screen.getByTestId('TaskDetailModal.createTask'))

    await waitFor(() => {
      expect(screen.getByTestId('SuccessModal').props.visible).toBeTruthy()
    })
    await waitFor(() => {
      expect(screen.queryByText(taskToCreate)).toBeTruthy()
    })
  })
})

describe('When a user update a task', () => {
  test('should appear a success modal', async () => {
    const newTaskTitle = 'Task udpated'
    const { screen } = renderTodoListScreen()

    expect(screen.queryByTestId('Loading')).toBeTruthy()

    await waitFor(() => {
      expect(screen.queryByTestId('Loading')).toBeNull()
    })

    expect(screen.queryByText(newTaskTitle)).toBeFalsy()

    expect(screen.getByTestId('TaskDetailModalID').props.visible).toBe(false)

    fireEvent.press(screen.getByTestId('task-1'))
    expect(screen.getByTestId('TaskDetailModalID').props.visible).toBe(true)

    fireEvent.changeText(screen.getByTestId('TaskDetailModal.titleInput'), newTaskTitle)

    fireEvent.press(screen.getByTestId('TaskDetailModal.updateTask'))

    await waitFor(() => {
      expect(screen.getByTestId('SuccessModal').props.visible).toBeTruthy()
    })
    await waitFor(() => {
      expect(screen.queryByText(newTaskTitle)).toBeTruthy()
    })
  })
})

describe('When a user delete a task', () => {
  test('should appear a success modal', async () => {
    const taskToDelete = 'Study'
    const { screen } = renderTodoListScreen()

    expect(screen.queryByTestId('Loading')).toBeTruthy()

    await waitFor(() => {
      expect(screen.queryByTestId('Loading')).toBeNull()
    })

    expect(screen.queryByText(taskToDelete)).toBeTruthy()

    expect(screen.getByTestId('TaskDetailModalID').props.visible).toBe(false)

    fireEvent.press(screen.getByTestId('task-1'))
    expect(screen.getByTestId('TaskDetailModalID').props.visible).toBe(true)

    fireEvent.press(screen.getByTestId('TaskDetailModal.deleteTask'))

    await waitFor(() => {
      expect(screen.getByTestId('SuccessModal').props.visible).toBeTruthy()
    })
    await waitFor(() => {
      expect(screen.queryByText(taskToDelete)).toBeFalsy()
    })
  })
})

const renderTodoListScreen = () => {
  const store = getMockStore()

  const screen = render(
    <Provider store={store}>
      <TodoListApp />
    </Provider>
  )

  return { screen }
}
