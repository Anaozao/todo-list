import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    allTasks: []
  },
  reducers: {
    setTasks: (state, { payload }) => ({
      ...state,
      allTasks: payload
    }),
  }
})

export const { setTasks } = taskSlice.actions;

export default taskSlice.reducer;