import { createSlice } from '@reduxjs/toolkit'
import { IFiles } from '../models'

const defaultState: IFiles = {
  files: [],
  currentFolder: null,
  folderStack: [],
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
    addFile: (state, action) => {
      state.files = [...state.files, action.payload]
    },
    setFolderStack: (state, action) => {
      state.folderStack = action.payload
    },
    deleteFile: (state, action) => {
      state.files = [...state.files.filter(file => file._id !== action.payload)]
    }
   }
})

export const { setFiles,  setCurrentFolder, addFile, setFolderStack, deleteFile } = fileSlice.actions
export const fileReducer = fileSlice.reducer
