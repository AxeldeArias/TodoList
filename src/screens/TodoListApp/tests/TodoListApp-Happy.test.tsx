import { fireEvent, waitFor } from '@testing-library/react-native'
import { setupServer } from 'msw/node'
import { renderTodoListScreen } from './TodoListAppSetup'
import { TodoListAppHandlers } from './TodoListHandlers'

const server = setupServer(...TodoListAppHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('When a user has tasks', () => {
  test('should see them', async () => {
    const { screen, utils } = renderTodoListScreen()

    await utils.finishLoading()

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
    const { screen, utils } = renderTodoListScreen()

    await utils.finishLoading()

    await utils.createTask({ title: taskToCreate })

    await waitFor(() => {
      expect(screen.getByTestId('SuccessModal').props.visible).toBeTruthy()
    })
    await waitFor(() => {
      expect(screen.queryByText(taskToCreate)).toBeTruthy()
    })
  })
})

describe('When a user updates a task', () => {
  test('should see a success modal', async () => {
    const newTaskTitle = 'Task udpated'
    const { screen, utils } = renderTodoListScreen()

    await utils.finishLoading()

    expect(screen.queryByText(newTaskTitle)).toBeFalsy()

    utils.updateTask({ newTitle: newTaskTitle })

    await waitFor(() => {
      expect(screen.getByTestId('SuccessModal').props.visible).toBeTruthy()
    })
    await waitFor(() => {
      expect(screen.queryByText(newTaskTitle)).toBeTruthy()
    })
  })
})

describe('When a user deletes a task', () => {
  test('should see a success modal', async () => {
    const taskToDelete = 'Study'
    const { screen, utils } = renderTodoListScreen()

    await utils.finishLoading()

    expect(screen.queryByText(taskToDelete)).toBeTruthy()

    utils.deleteTask()

    await waitFor(() => {
      expect(screen.getByTestId('SuccessModal').props.visible).toBeTruthy()
    })
    await waitFor(() => {
      expect(screen.queryByText(taskToDelete)).toBeFalsy()
    })
  })
})
