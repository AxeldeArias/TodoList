import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type HeaderProps = {
  onClose: () => void
}

const Header = ({ onClose }: HeaderProps) => {
  return (
   <View style={styles.header}>
      <TouchableOpacity
        onPress={onClose}
      >
        <Icon name={'close-outline'} size={30} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  }
})

export default Header
