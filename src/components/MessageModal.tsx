import React from 'react'
import { View, Modal, StyleSheet, useWindowDimensions, Text, TouchableOpacity, TouchableWithoutFeedback, Image, ImageSourcePropType } from 'react-native'
import { Colors } from '../utils/Colors'

type MessageModalProps = {
  visible: boolean,
  onClose: () => void,
  title: string,
  image: ImageSourcePropType,
}

const MessageModal = ({ visible, onClose, title, image }: MessageModalProps) => {
  const { width, height } = useWindowDimensions()

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      transparent
      style={styles.modal}
    >
      <TouchableOpacity style={styles.modal} onPress={onClose}>
        <TouchableWithoutFeedback>
          <View style={{
            width: width * 0.8,
            height: height * 0.5,
            ...styles.card
          }}>
            <Image
              source={image}
              style={{ ...styles.image, maxWidth: width * 0.8 }}
            />
            <View style={styles.footer}>
              <Text style={styles.title}>{title}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparentDark
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  image: {
    aspectRatio: 1,
    flex: 1,
    alignSelf: 'center'
  },
  card: {
    shadowColor: Colors.dark,
    backgroundColor: Colors.grey,
    overflow: 'hidden',
    borderRadius: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1
  }
})

export default MessageModal
