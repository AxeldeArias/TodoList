import React from 'react'
import { TaskItem } from '../domain/Tasks/TaskModel'
import ListItem from './ListItem'

type ItemProps = {
  title: string,
  state: TaskItem['state']
  onPress?: () => void,
  disabled?: boolean,
  testID?: string
}

const IconByState = {
  PLANNED: 'play-circle-outline',
  IN_PROGRESS: 'pause-circle-outline',
  COMPLETED: 'check-outline'
}

const Task = ({ title, onPress, state, disabled, testID }: ItemProps) => {
  return (
    <ListItem
      disabled={disabled}
      title={title}
      testID={testID}
      iconName={IconByState[state]}
      onPress={onPress}
    />
  )
}

export default Task
