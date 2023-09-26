import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IUserData } from '../models'
import { auth } from '../services/userApi'

const defaultState: IUserData = {
  currentUser: {},
  isAuth: false,
}

// export const authUser = createAsyncThunk(
//   'USER-REDUCER/AUTH-USER',
//   async () => {
//     const user = await auth()

//     return {
//       currentUser: user,
//     }
//   }
// )

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
  },
  // extraReducers: builder => {
  //   builder.addCase(authUser.fulfilled, (state, action) => {
  //     state.authUser.currentUser = action.payload.currentUser
      
  //   })
  // }
})

export const { setUser, setIsAuth } = userSlice.actions
export const userReducer = userSlice.reducer

