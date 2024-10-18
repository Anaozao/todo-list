import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    id: 0,
    isLogged: false
  },
  reducers: {
    setUser: (state, { payload }) => ({
      ...state,
      username: payload.username,
      email: payload.email,
      id: payload.id,
      isLogged: true
    }),
    logout: (state) => ({
      ...state,
      username: '',
      email: '',
      id: 0,
      isLogged: false
    })
  }
})

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;