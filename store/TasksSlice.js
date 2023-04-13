import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAsyncTasks = createAsyncThunk(
  "tasks/fetchAsyncTasks",
  async () => {
    let tasks_url = `https://savee-api.vercel.app/user/${id}/task`;
    const response = await fetch(tasks_url);
    let actualData = await response.json();
    let actualDataObject = await actualData.data;
    return actualDataObject;
  }
);
const initialState = {
  tasks: {},
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: {
    [fetchAsyncTasks.pending]: () => {
      console.log("pending...");
    },
    [fetchAsyncTasks.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully!");
      return { ...state, tasks: payload };
    },
    [fetchAsyncTasks.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});

export const getTasks = (state) => state.tasks; 


export default tasksSlice.reducer;
