import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAsyncConsumption = createAsyncThunk(
  "consumption/fetchAsyncConsumption",
  async (id) => {
    let consumption_url = `https://savee-api.vercel.app/consumption/user/${id}`;
    const response = await fetch(consumption_url);
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
    [fetchAsyncConsumption.pending]: () => {
      console.log("pending...");
    },
    [fetchAsyncConsumption.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully!");
      return { ...state, status: 200, consumption: payload  };
    },
    [fetchAsyncConsumption.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});

export const getConsumption = (state) => state.consumption; // nome da slice (user) e nome da propriedade (user)

export default consumptionSlice.reducer;
