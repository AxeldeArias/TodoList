import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type ListItemProps = {
  title: string,
  iconName: string,
  onPress?: () => void,
  disabled?: boolean
}

const ListItem = ({ title, iconName, onPress, disabled }: ListItemProps) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.textItemContainer}>
        <Text
          style={styles.textItem}
          numberOfLines={1}
        >
        {title}
        </Text>
      </View>
      <Icon name={iconName} size={30} color="#900" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    height: 50,
    marginTop: 15,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textItemContainer: {
    flex: 1,
    marginRight: 5
  },
  textItem: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default ListItem
