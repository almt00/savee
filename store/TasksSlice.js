import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAsyncTasks = createAsyncThunk(
  "tasks/fetchAsyncTasks",
  async () => {
    let tasks_url = `../api/tasks`;
    const response = await fetch(tasks_url);
    let actualData = await response.json();
    let actualDataObject = await JSON.parse(actualData);
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
      console.log("fetched successfully!", payload);
      return { ...state, tasks: payload };
    },
    [fetchAsyncTasks.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});

export const getTasks = (state) => state.tasks.tasks; 


export default tasksSlice.reducer;
