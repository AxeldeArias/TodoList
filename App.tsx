import React from 'react'
import { Provider } from 'react-redux'
import store from './src/domain/store'
import TodoListApp from './src/screens/TodoListApp/TodoListApp'
import Reactotron from 'reactotron-react-native'

Reactotron
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

const App = () => {
  return (
    <Provider store={store}>
      <TodoListApp />
    </Provider>
  )
}

export default App
