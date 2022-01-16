import React from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native'

type ScreenProps ={
  children: React.ReactNode,
  loading?: boolean,
  style?: StyleProp<ViewStyle>
}

const Screen = ({ children, loading, style }: ScreenProps) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={30} testID="Loading" />
      </View>
    )
  }

  return (
   <SafeAreaView style={style}>
    {children}
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default Screen
