import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import tasksReducer from "./TasksSlice";
import GroupSlice from "./GroupSlice";
import groupDetailsSlice from "./GroupDetailsSlice";
import pageSlice from "./PageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
    group: GroupSlice,
    groupDetails: groupDetailsSlice,
    page: pageSlice,
  },
});
