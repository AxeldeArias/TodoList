import React from 'react'
import { TaskItem } from '../domain/Tasks/TaskModel'
import ListItem from './ListItem'

type ItemProps = {
  title: string,
  state: TaskItem['state']
  onPress?: () => void,
  disabled?: boolean
}

const IconByState = {
  PLANNED: 'play-circle-outline',
  IN_PROGRESS: 'pause-circle-outline',
  COMPLETED: 'check-outline'
}

const Task = ({ title, onPress, state, disabled }: ItemProps) => {
  return (
    <ListItem
      disabled={disabled}
      title={title}
      iconName={IconByState[state]}
      onPress={onPress}
    />
  )
}

export default Task
