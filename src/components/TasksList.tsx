import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import useCurrentTask from '../domain/CurrentTask/useCurrentTask'
import useTasksService from '../domain/Tasks/useTaskService'
import Task from './Task'

const TasksList = () => {
  const { setCurrentTask } = useCurrentTask()

  const {
    tasks,
    loading,
    gettingAllTasks,
    handleGetTasks
  } = useTasksService()

  useEffect(() => {
    handleGetTasks()
  }, [])

  if (gettingAllTasks) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={30} testID="Loading" />
      </View>
    )
  }

  if (!tasks.length) {
    return <Text style={styles.emptyList}>{"You don't have any tasks"}</Text>
  }

  return <>
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
      ))}
  </>
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyList: {
    fontSize: 14
  }
})

export default TasksList
