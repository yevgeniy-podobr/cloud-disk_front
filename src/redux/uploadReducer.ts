import { createSlice } from '@reduxjs/toolkit'
import { IUploadFile } from '../models'

interface IState {
  isVisible: boolean,
  files: IUploadFile[]
}

const defaultState: IState = {
  isVisible: false,
  files: [],
}

export const uploadSlice = createSlice({
  name: 'UPLOAD-REDUCER',
  initialState: defaultState,
  reducers: {
    setIsVisible: (state, action) => {
      state.isVisible = action.payload
    },
    setUploadFiles: (state, action) => {
      state.files = action.payload
    }
  }
})

export const { setIsVisible, setUploadFiles } = uploadSlice.actions
export const uploadReducer = uploadSlice.reducer