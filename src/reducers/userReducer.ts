// import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const defaultState = {
  currentUser: {},
  isAuth: false,
}

export default function userReducer (state = defaultState, action: any) {
  switch (action) {
  
    default:
      return state;
  }
}

// export const userSlice = createSlice({
//   name: 'USER-REDUCER',
//   initialState: defaultState,
//   reducers: {

//   }
// })

// export const { setWorkerInfo } = obInfoSlice.actions
// export const userReducer = userSlice.reducer

