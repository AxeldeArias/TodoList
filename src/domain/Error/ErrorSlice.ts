import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type State = {
  title: string,
  open: boolean,
}

const initialState: State = {
  title: 'Algo salió mal',
  open: false
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    openErrorModal (state, { payload }: PayloadAction<string | undefined>) {
      state.title = payload || initialState.title
      state.open = true
    },
    closeErrorModal (state) {
      state.open = false
    }
  }
})

export const { openErrorModal, closeErrorModal } = errorSlice.actions
export const errorSelector = (state: RootState) => state.error
