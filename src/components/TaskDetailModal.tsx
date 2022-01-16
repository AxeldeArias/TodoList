import React, { useEffect, useState } from 'react'
import { View, Modal, SafeAreaView, TextInput, StyleSheet, Text } from 'react-native'
import DatePickerInput from './DatePickerInput'
import PrimaryButton from './PrimaryButton'
import useTasksService from '../domain/Tasks/useTaskService'
import Header from './Header'
import useCurrentTask from '../domain/CurrentTask/useCurrentTask'
import { Colors } from '../utils/Colors'
import TaskStateDropDown from './TaskStateDropDown'
import { ScrollView } from 'react-native-gesture-handler'

const errorInitialValues = {
  title: ''
}

const CurrentTaskModal = () => {
  const {
    loading,
    handleCreateTask,
    handleDeleteTask,
    handleUpdateTask
  } = useTasksService()

  const {
    currentTask,
    removeCurrentTask,
    updateCurrentTask
  } = useCurrentTask()

  const [errors, setErrors] = useState(errorInitialValues)

  const validateForm = (callback: () => void) => {
    if (!currentTask || !currentTask.title) {
      setErrors({ ...errors, title: 'El titulo es obligatorio' })
    } else {
      return callback()
    }
  }

  useEffect(() => {
    if (currentTask) {
      setErrors(errorInitialValues)
    }
  }, [currentTask])

  return (
    <Modal
      visible={!!currentTask}
      onRequestClose={removeCurrentTask}
      animationType="slide"
    >
      <SafeAreaView style={styles.screen}>

        <Header onClose={removeCurrentTask} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <Text style={styles.title}>Title</Text>
            <TextInput
              numberOfLines={1}
              style={styles.titleInput}
              maxLength={60}
              placeholder='Complete Title'
              value={currentTask?.title}
              onChangeText={(text) => {
                errors.title && setErrors({ ...errors, title: '' })
                updateCurrentTask({ title: text })
              }}
            />
            {!!errors.title && <Text style={styles.error}>{errors.title}</Text>}

            <Text style={styles.title}>State</Text>
            <TaskStateDropDown
              onChange={(text) => {
                updateCurrentTask({ state: text })
              }}
              initialValue={currentTask?.state}
            />

            <Text style={styles.title}>Estimated Date</Text>
            <DatePickerInput
              value={currentTask?.estimate}
              onChangeText={(text) => {
                updateCurrentTask({ estimate: text })
              }}
            />

            <Text style={styles.title}>Description</Text>
            <TextInput
              style={styles.descriptionInput}
              maxLength={255}
              placeholder='Complete Description'
              multiline={true}
              numberOfLines={8}
              value={currentTask?.description}
              onChangeText={(text) => {
                validateForm(() => {
                  updateCurrentTask({ description: text })
                })
              }}
            />

          </View>
        </ScrollView>
        <View style={styles.footer}>
          {
            currentTask?.id ? (
              <>
                <PrimaryButton
                  containerStyle={styles.button}
                  disabled={loading}
                  title={'Update Task'}
                  onPress={() => {
                    validateForm(() => {
                      handleUpdateTask()
                    })
                  }}
                />
                <PrimaryButton
                  containerStyle={styles.button}
                  disabled={loading}
                  inverted
                  title={'Delete Task'}
                  onPress={handleDeleteTask}
                />
              </>
            ) : (
              <PrimaryButton
                containerStyle={styles.button}
                disabled={loading}
                title={'Create Task'}
                onPress={() => {
                  validateForm(() => {
                    handleCreateTask()
                  })
                }}
              />
            )
          }
        </View>

      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 20
  },
  title: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold'
  },
  body: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  titleInput: {
    fontSize: 22,
    height: 65,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.grey,
    borderRadius: 8
  },
  descriptionInput: {
    fontSize: 22,
    height: 140,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.grey,
    borderRadius: 8
  },
  footer: {
    marginTop: 15
  },
  button: {
    marginBottom: 15
  },
  error: {
    color: Colors.error,
    marginTop: 10
  }
})

export default CurrentTaskModal
