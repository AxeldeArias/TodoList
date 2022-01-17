import { waitFor } from '@testing-library/react-native'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { TodoListAppHandlers } from './TodoListHandlers'
import { renderTodoListScreen } from './TodoListAppSetup'
import { defaultConfig } from '../../../config/api'

const server = setupServer(...TodoListAppHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('When a user creates a task with api error', () => {
  test('should see a error modal', async () => {
    server.use(rest.post(`${defaultConfig.baseURL}/task`, (_req, res, ctx) => {
      return res(
        ctx.status(500)
      )
    }))
    const taskToCreate = 'New Task'
    const { screen, utils } = renderTodoListScreen()

    await utils.finishLoading()

    expect(screen.queryByText(taskToCreate)).toBeFalsy()

    await utils.createTask({ title: taskToCreate })

    await waitFor(() => {
      expect(screen.getByTestId('ErrorModal').props.visible).toBeTruthy()
    })
    await waitFor(() => {
      expect(screen.queryByText(taskToCreate)).toBeFalsy()
    })
  })
})

describe('When a user updates a task with api error', () => {
  test('should see a error modal', async () => {
    server.use(rest.put(`${defaultConfig.baseURL}/task`, (_req, res, ctx) => {
      return res(
        ctx.status(500)
      )
    }))
    const newTaskTitle = 'Task updated'
    const { screen, utils } = renderTodoListScreen()

    await utils.finishLoading()

    expect(screen.queryByText(newTaskTitle)).toBeFalsy()

    utils.updateTask({ newTitle: 'Task updated' })

    await waitFor(() => {
      expect(screen.getByTestId('ErrorModal').props.visible).toBeTruthy()
    })

    await waitFor(() => {
      expect(screen.queryByText(newTaskTitle)).toBeFalsy()
    })
  })
})

describe('When a user deletes a task with api error', () => {
  test('should see a error modal', async () => {
    server.use(rest.delete(`${defaultConfig.baseURL}/task`, (_req, res, ctx) => {
      return res(
        ctx.status(500)
      )
    }))
    const taskToDelete = 'Study'
    const { screen, utils } = renderTodoListScreen()

    await utils.finishLoading()

    expect(screen.queryByText(taskToDelete)).toBeTruthy()

    utils.deleteTask()

    await waitFor(() => {
      expect(screen.getByTestId('ErrorModal').props.visible).toBeTruthy()
    })
    await waitFor(() => {
      expect(screen.queryByText(taskToDelete)).toBeTruthy()
    })
  })
})
