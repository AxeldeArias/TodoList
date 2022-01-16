import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { closeSuccessModal, openSuccessModal, successSelector } from './SuccessSlice'

const useSuccess = () => {
  const dispatch = useAppDispatch()
  const { isOpen } = useAppSelector(successSelector)

  const _closeSuccessModal = () => {
    dispatch(closeSuccessModal())
  }
  const _openSuccessModal = (modalMessage?: string) => {
    dispatch(openSuccessModal(modalMessage))
  }

  return {
    isOpen,
    closeSuccessModal: _closeSuccessModal,
    openSuccessModal: _openSuccessModal
  }
}

export default useSuccess
