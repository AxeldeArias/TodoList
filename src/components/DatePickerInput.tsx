import React, { useState } from 'react'
import { Platform, StyleSheet, TextInput, TextInputProps, TouchableOpacity as TouchableAndroid } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { TouchableOpacity as TouchableIOS } from 'react-native-gesture-handler'

type DatePickerInputProps = TextInputProps;

const DatePickerInput = ({ onChangeText, ...props }: DatePickerInputProps) => {
  const [date, setDate] = useState(new Date())
  const [openDateModal, setOpenDateModal] = useState(false)

  const Touchable = Platform.OS === 'ios' ? TouchableIOS : TouchableAndroid

  return (
    <>
      <Touchable
        onPress={() => {
          setOpenDateModal(true)
        }}>
        <TextInput style={styles.text} editable={false} {...props} placeholder='No Date'/>
      </Touchable>

      <DatePicker
        modal
        mode={'date'}
        open={openDateModal}
        date={date}
        onConfirm={dateSelected => {
          setOpenDateModal(false)
          setDate(dateSelected)
          onChangeText?.(
            dateSelected
              .toLocaleDateString('en-US', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit'
              })
              .toString()
          )
        }}
        onCancel={() => {
          setOpenDateModal(false)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  text: { fontSize: 22 }
})
export default DatePickerInput
