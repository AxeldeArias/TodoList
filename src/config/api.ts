import axios from 'axios'

export const defaultConfig = {
  baseURL: 'https://8wqy4.mocklab.io',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}

const Api = axios.create(defaultConfig)

export default Api
