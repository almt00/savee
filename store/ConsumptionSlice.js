import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAsyncConsumptionSlice = createAsyncThunk(
  "user/fetchAsyncConsumptionSlice",
  async (id) => {
    let user_url = `https://savee-api.vercel.app/consumption/user/${id}`;
    const response = await fetch(user_url);
    let actualData = await response.json();
    let actualDataObject = await actualData;
    return actualDataObject;
  }
);

const initialState = {
  consumption: {},
};

const consumptionSlice = createSlice({
  name: "consumption",
  initialState,
  extraReducers: {
    [fetchAsyncConsumptionSlice.pending]: () => {
      console.log("pending...");
    },
    [fetchAsyncConsumptionSlice.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully!");
      return { ...state, status: 200, consumption: payload  };
    },
    [fetchAsyncConsumptionSlice.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});

export const getConsumption = (state) => state.consumption; // nome da slice (user) e nome da propriedade (user)

export default consumptionSlice.reducer;
