import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import tasksReducer from "./TasksSlice";
import GroupSlice from "./GroupSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
    group: GroupSlice,
  },
});
