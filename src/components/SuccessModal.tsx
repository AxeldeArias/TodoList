import React from 'react'
import { useAppSelector } from '../hooks/redux'
import MessageModal from './MessageModal'
import { successSelector } from '../domain/Success/SuccessSlice'
import useSuccess from '../domain/Success/useSuccess'

const SuccessModal = () => {
  const { title, isOpen } = useAppSelector(successSelector)
  const { closeSuccessModal } = useSuccess()

  return (
    <MessageModal
      visible={isOpen}
      onClose={closeSuccessModal}
      title={title}
      image={require('../assets/success.jpeg')}
    />
  )
}

export default SuccessModal
