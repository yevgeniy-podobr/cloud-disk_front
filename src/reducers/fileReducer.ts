import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const defaultState = {

}

// export default function fileReducer (state = defaultState, action: any) {
//   switch (action) {
  
//     default:
//       return state;
//   }
// }

// export default function userReducer (state = defaultState, action: any) {
//   switch (action) {
  
//     default:
//       return state;
//   }
// }

export const fileSlice = createSlice({
  name: 'FILE-REDUCER',
  initialState: defaultState,
  reducers: {

  }
})

// export const { setWorkerInfo } = obInfoSlice.actions
export const fileReducer = fileSlice.reducer
