import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAsyncRoutineSlice = createAsyncThunk(
  "user/fetchAsyncRoutine",
  async (id) => {
    let routine_url = `https://savee-api.vercel.app/user/${id}/routine`;
    const response = await fetch(routine_url);
    let actualData = await response.json();
    let actualDataObject = await actualData;
    return actualDataObject;
  }
);

const initialState = {
  routine: {},
};

const routineSlice = createSlice({
  name: "routine",
  initialState,
  extraReducers: {
    [fetchAsyncRoutineSlice.pending]: () => {
      console.log("pending...");
    },
    [fetchAsyncRoutineSlice.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully!");
      return { ...state, status: 200, routine: payload  };
    },
    [fetchAsyncRoutineSlice.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});

export const getRoutine = (state) => state.routine; // nome da slice (user) e nome da propriedade (user)

export default routineSlice.reducer;
