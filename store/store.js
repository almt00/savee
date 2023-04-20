import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import tasksReducer from "./TasksSlice";
import GroupSlice from "./GroupSlice";
import groupDetailsSlice from "./GroupDetailsSlice";
import pageSlice from "./PageSlice";
import ConsumptionSlice from "./ConsumptionSlice";
import PaymentSlice from "./PaymentSlice";
import RoutineSlice from "./RoutineSlice";
import PaymentGroupSlice from "./PaymentGroupSlice";
import PaymentGroupDetailsSlice from "./PaymentGroupDetailsSlice";
import UsersSlice from "./UsersSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
    group: GroupSlice,
    groupDetails: groupDetailsSlice,
    page: pageSlice,
    consumption: ConsumptionSlice,
    payment: PaymentSlice,
    routine: RoutineSlice,
    paymentGroup: PaymentGroupSlice,
    paymentGroupDetails: PaymentGroupDetailsSlice,
    users: UsersSlice,
  },
});
