import React, { useState } from 'react'
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker'

type TaskState = 'IN_PROGRESS' | 'PLANNED' | 'COMPLETED' | undefined

type TaskStateDropDownProps = {
  initialValue?: string,
  onChange: (value: TaskState) => void
  disabled?: boolean
}

const TaskStateDropDown = ({ onChange, initialValue, disabled = false }: TaskStateDropDownProps) => {
  const [value, setValue] = useState<ValueType | null>(initialValue || null)
  const [taskOptions, setTaskOptions] = useState([
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Planned', value: 'PLANNED' },
    { label: 'Completed', value: 'COMPLETED' }
  ])

  const [open, setOpen] = useState(false)

  return (
  <DropDownPicker
    disabled={disabled}
    listMode="SCROLLVIEW"
    scrollViewProps={{
      nestedScrollEnabled: true
    }}
    items={taskOptions}
    setItems={setTaskOptions}
    value={value}
    onChangeValue={(a) => {
      a && onChange(a.toString() as TaskState)
    }}
    setValue={(value) => {
      setValue(value)
      onChange(value?.toString() as TaskState)
    }}
    open={open}
    setOpen={setOpen}
  />
  )
}

export default TaskStateDropDown
