import { configureStore } from '@reduxjs/toolkit'
import {userReducer} from './userReducer'
import {fileReducer} from './fileReducer'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { uploadReducer } from './uploadReducer'

export type RootState = ReturnType<typeof store.getState>

export type AsyncThunkConfig = {
  state: RootState
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    file: fileReducer,
    uploadFiles: uploadReducer,
  }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
