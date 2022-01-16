import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text, TouchableOpacity, ViewStyle
} from 'react-native'
import { Colors } from '../utils/Colors'

type PrimaryButtonProps = {
  title: string,
  onPress: () => void,
  disabled?: boolean,
  inverted?: boolean,
  containerStyle?: StyleProp<ViewStyle>,
  testID?: string,
}

const PrimaryButton = ({
  title,
  containerStyle,
  onPress,
  disabled,
  inverted,
  testID
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      style={[{ ...styles.container, ...(inverted && { backgroundColor: Colors.darkGrey }) }, containerStyle]}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
     >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.success,
    borderRadius: 8,
    padding: 10
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    color: Colors.white
  }
})

export default PrimaryButton
