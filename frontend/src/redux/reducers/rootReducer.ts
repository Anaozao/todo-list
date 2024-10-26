import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import taskReducer from './tasksSlice'
import loadingSlice from './loadingSlice'

const rootReducer = combineReducers({
  user: userReducer,
  tasks: taskReducer,
  loading: loadingSlice,
})

export default rootReducer;