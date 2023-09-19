import { createSlice } from '@reduxjs/toolkit'

interface IFile {
  childs: string[]
  name: string
  path: string
  size: number
  type: string
  user: string
  _id: string
}
interface IFiles {
  files: IFile[],
  currentDir: null | string
}

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
  }
})

export const { setFiles,  setCurrentDir} = fileSlice.actions
export const fileReducer = fileSlice.reducer
