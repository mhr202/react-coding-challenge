import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: 'abc',
    password: 'abc',
    role: 'client'
  },
  reducers: {
    setName: (state, action) => {
      state.username = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setRole: (state, action) => {
      state.role = action.payload
    },
    userinfo: (state) => {
      return state.user
    }
  }
})

export const { setName, setPassword, setRole, userinfo } = userSlice.actions

export default userSlice.reducer