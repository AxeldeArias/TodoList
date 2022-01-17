import React, { useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import Task from '../../components/Task'
import CurrentTaskModal from '../../components/TaskDetailModal'
import Screen from '../../components/Screen'
import ErrorModal from '../../components/ErrorModal'
import useCurrentTask from '../../domain/CurrentTask/useCurrentTask'
import TouchableIcon from '../../components/TouchableIcon'
import useTasksService from '../../domain/Tasks/useTaskService'
import SuccessModal from '../../components/SuccessModal'

const TodoListApp = () => {
  const { setCurrentTask } = useCurrentTask()

  const {
    tasks,
    loading,
    handleGetTasks
  } = useTasksService()

  useEffect(() => {
    handleGetTasks()
  }, [])

  return (
    <Screen
      loading={loading}
      style={styles.screen}
    >

      <Text style={styles.title}>
        Listado de Tareas
      </Text>

      {
        tasks.map((item) => (
          <Task
            key={item.id}
            testID={`task-${item.id}`}
            disabled={loading}
            title={item.title}
            state={item.state}
            onPress={() => {
              setCurrentTask(item)
            }}
          />
        ))
      }

      <TouchableIcon
        containerStyle={styles.addCurrentTaskIcon}
        onPress={() => {
          setCurrentTask()
        }}
        iconName="plus"
        testID="AddNewTaskButton"
      />

      <CurrentTaskModal />
      <ErrorModal />
      <SuccessModal />

    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15
  },
  addCurrentTaskIcon: {
    position: 'absolute',
    right: 10,
    bottom: 15
  }
})

export default TodoListApp
