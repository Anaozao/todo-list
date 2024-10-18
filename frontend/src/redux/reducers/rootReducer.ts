import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import taskReducer from './tasksSlice'

const rootReducer = combineReducers({
  user: userReducer,
  tasks: taskReducer
})

export default rootReducer;