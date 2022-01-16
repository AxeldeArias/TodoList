import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type State = {
  title: string,
  isOpen: boolean,
}

const initialState: State = {
  title: 'Algo salió mal',
  isOpen: false
}

export const successSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    openSuccessModal (state, { payload }: PayloadAction<string | undefined>) {
      state.title = payload || initialState.title
      state.isOpen = true
    },
    closeSuccessModal (state) {
      state.isOpen = false
    }
  }
})

export const { openSuccessModal, closeSuccessModal } = successSlice.actions
export const successSelector = (state: RootState) => state.success
