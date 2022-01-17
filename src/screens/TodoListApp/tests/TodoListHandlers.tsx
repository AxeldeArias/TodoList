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
