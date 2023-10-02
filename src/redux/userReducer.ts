import { createSlice } from '@reduxjs/toolkit'
import { IUserData } from '../models'

const defaultState: IUserData = {
  currentUser: null,
  isAuth: false,
}

export const userSlice = createSlice({
  name: 'USER-REDUCER',
  initialState: defaultState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    }
  }
})

export const { setUser, setIsAuth } = userSlice.actions
export const userReducer = userSlice.reducer

