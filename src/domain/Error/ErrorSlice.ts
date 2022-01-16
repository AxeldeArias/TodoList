import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type State = {
  title: string,
  open: boolean,
}

export const errorState: State = {
  title: 'Something was wrong',
  open: false
}

export const errorSlice = createSlice({
  name: 'error',
  initialState: errorState,
  reducers: {
    openErrorModal (state, { payload }: PayloadAction<string | undefined>) {
      state.title = payload || errorState.title
      state.open = true
    },
    closeErrorModal (state) {
      state.open = false
    }
  }
})

export const { openErrorModal, closeErrorModal } = errorSlice.actions
export const errorSelector = (state: RootState) => state.error
