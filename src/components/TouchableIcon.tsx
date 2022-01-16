import React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../utils/Colors'

type TouchableIconProps = {
  onPress: () => void;
  iconName: string,
  containerStyle: StyleProp<ViewStyle>
}

const TouchableIcon = ({
  onPress,
  iconName,
  containerStyle
}: TouchableIconProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      <Icon name={iconName} size={30} color="black" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: Colors.grey,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default TouchableIcon
