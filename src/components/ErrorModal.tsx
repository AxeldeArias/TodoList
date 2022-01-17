import React from 'react'
import { errorSelector } from '../domain/Error/ErrorSlice'
import { useAppSelector } from '../hooks/redux'
import useError from '../domain/Error/useAppError'
import MessageModal from './MessageModal'

const ErrorModal = () => {
  const { title, open } = useAppSelector(errorSelector)
  const { closeErrorModal } = useError()

  return (
    <MessageModal
      visible={open}
      onClose={closeErrorModal}
      title={title}
      testID='ErrorModal'
      image={require('../assets/lost-connection.png')}
    />
  )
}

export default ErrorModal
