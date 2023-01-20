import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import tasksReducer from "./TasksSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer
  },
});
