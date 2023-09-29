import { createSlice } from '@reduxjs/toolkit'
import { IFiles } from '../models'
import { EFolderDisplayOptions } from '../utils/constants/fileConstants'

const defaultState: IFiles = {
  files: [],
  currentFolder: null,
  folderStack: [],
  folderDisplay: EFolderDisplayOptions.list,
}

export const fileSlice = createSlice({
  name: 'FILE-REDUCER',
  initialState: defaultState,
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload
    },
    setCurrentFolder: (state, action) => {
      state.currentFolder = action.payload
    },
    setFolderStack: (state, action) => {
      state.folderStack = action.payload
    },
    setFolderDisplay: (state, action) => {
      state.folderDisplay = action.payload
    },
   }
})

export const { setFiles,  setCurrentFolder, setFolderStack, setFolderDisplay } = fileSlice.actions
export const fileReducer = fileSlice.reducer
