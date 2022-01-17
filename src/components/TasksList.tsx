import React from 'react'
import { StyleSheet, Text } from 'react-native'
import useCurrentTask from '../domain/CurrentTask/useCurrentTask'
import useTasksService from '../domain/Tasks/useTaskService'
import Task from './Task'

const TasksList = () => {
  const { setCurrentTask } = useCurrentTask()

  const {
    tasks,
    loading
  } = useTasksService()

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
  emptyList: {
    fontSize: 14
  }
})

export default TasksList
