import { createSlice } from '@reduxjs/toolkit'
import { IFiles } from '../models'

const defaultState: IFiles = {
  files: [],
  currentDir: null,
}

export const fileSlice = createSlice({
  name: 'FILE-REDUCER',
  initialState: defaultState,
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload
    },
    setCurrentDir: (state, action) => {
      state.currentDir = action.payload
    },
    addFile: (state, action) => {
      state.files = [...state.files, action.payload]
    },
  }
})

export const { setFiles,  setCurrentDir, addFile} = fileSlice.actions
export const fileReducer = fileSlice.reducer
