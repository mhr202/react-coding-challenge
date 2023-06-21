import { createSlice } from '@reduxjs/toolkit'

const clientSlice = createSlice({
  name: 'client',
  initialState: {
    name: [],
  },
  reducers: {
    setClientName: (state, action) => {
      state.name = [...state.name, action.payload]
    },
    getClientList: (state) => {
        return state.client
    }
  }
})

export const { setClientName, getClientList} = clientSlice.actions

export default clientSlice.reducer