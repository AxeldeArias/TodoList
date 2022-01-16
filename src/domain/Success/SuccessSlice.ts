import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type State = {
  title: string,
  isOpen: boolean,
}

export const successState: State = {
  title: 'Correct operation',
  isOpen: false
}

export const successSlice = createSlice({
  name: 'error',
  initialState: successState,
  reducers: {
    openSuccessModal (state, { payload }: PayloadAction<string | undefined>) {
      state.title = payload || successState.title
      state.isOpen = true
    },
    closeSuccessModal (state) {
      state.isOpen = false
    }
  }
})

export const { openSuccessModal, closeSuccessModal } = successSlice.actions
export const successSelector = (state: RootState) => state.success
