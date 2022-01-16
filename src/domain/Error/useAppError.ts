import { closeErrorModal, openErrorModal } from './ErrorSlice'
import { useAppDispatch } from '../../hooks/redux'

const useError = () => {
  const dispatch = useAppDispatch()

  const _closeErrorModal = () => {
    dispatch(closeErrorModal())
  }
  const _openErrorModal = (modalMessage?: string) => {
    dispatch(openErrorModal(modalMessage))
  }

  return {
    closeErrorModal: _closeErrorModal,
    openErrorModal: _openErrorModal
  }
}

export default useError
