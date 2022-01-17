import React, { useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import CurrentTaskModal from '../../components/TaskDetailModal'
import Screen from '../../components/Screen'
import ErrorModal from '../../components/ErrorModal'
import useCurrentTask from '../../domain/CurrentTask/useCurrentTask'
import TouchableIcon from '../../components/TouchableIcon'
import useTasksService from '../../domain/Tasks/useTaskService'
import SuccessModal from '../../components/SuccessModal'
import TaskSummary from '../../components/TaskSummary'
import { ScrollView } from 'react-native-gesture-handler'
import TasksList from '../../components/TasksList'

const TodoListApp = () => {
  const { setCurrentTask } = useCurrentTask()

  const {
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

      <Text style={styles.title}>TODO APP</Text>

      <Text style={styles.subtitle}>Summary:</Text>
      <TaskSummary containerStyle={styles.summary}/>

      <Text style={styles.subtitle}>Tasks:</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TasksList />
      </ScrollView>

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
    textAlign: 'center',
    marginVertical: 15
  },
  summary: {
    marginBottom: 25
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  addCurrentTaskIcon: {
    position: 'absolute',
    right: 10,
    bottom: 15
  }
})

export default TodoListApp
