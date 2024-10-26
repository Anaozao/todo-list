import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false
  },
  reducers: {
    setLoading: (state, { payload }) => (
      {
        ...state,
        isLoading: payload
      }
    ),
  }
})

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;