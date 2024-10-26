import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    setLoading: (state, { payload }) => payload,
  }
})

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;