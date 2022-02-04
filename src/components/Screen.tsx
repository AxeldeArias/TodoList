import React from 'react'
import {
  SafeAreaView,
  StyleProp,
  ViewStyle
} from 'react-native'

type ScreenProps ={
  children: React.ReactNode,
  loading?: boolean,
  style?: StyleProp<ViewStyle>
}

const Screen = ({ children, style }: ScreenProps) => {
  return (
   <SafeAreaView style={style}>
    {children}
   </SafeAreaView>
  )
}

export default Screen
