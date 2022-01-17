import { rest } from 'msw'
import { defaultConfig } from '../../../config/api'

export const TodoListAppHandlers = [
  rest.get(`${defaultConfig.baseURL}/tasks`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: '1',
          title: 'Study',
          description: 'Study maths',
          state: 'IN_PROGRESS',
          estimate: 2
        },
        {
          id: '2',
          title: 'clean',
          description: 'Clean the house',
          state: 'PLANNED',
          estimate: 5
        },
        {
          id: '3',
          title: 'Fix',
          description: 'fix the computer',
          state: 'COMPLETED',
          estimate: 6
        },
        {
          id: '4',
          title: 'Read',
          description: 'Read a book',
          state: 'COMPLETED',
          estimate: 10
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
