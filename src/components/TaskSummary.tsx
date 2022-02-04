import React from 'react'
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { TaskItem } from '../domain/Tasks/TaskModel'
import useTasksService from '../domain/Tasks/useTaskService'

const byState = (state: TaskItem['state']) => (task: TaskItem) => {
  return task.state === state
}

const sumEstimate = (prev: number, { estimate }: { estimate: number }) => {
  return prev + estimate
}

type TaskSummaryProps = {
  containerStyle?: StyleProp<ViewStyle>
}

const TaskSummary = ({ containerStyle }: TaskSummaryProps) => {
  const { tasks } = useTasksService()

  const hoursCompleted = tasks.filter(byState('COMPLETED')).reduce(sumEstimate, 0)
  const hoursInProgress = tasks.filter(byState('IN_PROGRESS')).reduce(sumEstimate, 0)
  const hoursPlanned = tasks.filter(byState('PLANNED')).reduce(sumEstimate, 0)

  return (
    <View style={containerStyle}>
      <View>
        <Text style={styles.hour}>
          Hours Completed:
          <Text> {hoursCompleted}</Text>
        </Text>
      </View>

      <View>
        <Text style={styles.hour}>
          Hours In Progress:
          <Text> {hoursInProgress}</Text>
        </Text>
      </View>

      <View>
        <Text style={styles.hour}>
          Hours Planned:
          <Text> {hoursPlanned}</Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  hour: {
    fontSize: 14,
    marginBottom: 5
  }
})

export default TaskSummary
