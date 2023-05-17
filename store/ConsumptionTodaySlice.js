import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const fetchAsyncConsumptionToday = createAsyncThunk(
  "consumptionToday/fetchAsyncConsumptionToday",
  async (id) => {
    let consumption_today_url = `https://savee-api.vercel.app/consumption/user/${id}/today`;
    const response = await fetch(consumption_today_url,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
    });
    let actualData = await response.json();
    let actualDataObject = await actualData;
    return actualDataObject;
  }
);

const initialState = {
  consumption_today: {},
};

const consumptionTodaySlice = createSlice({
  name: "consumption_today",
  initialState,
  extraReducers: {
    [fetchAsyncConsumptionToday.pending]: () => {
      console.log("pending...");
    },
    [fetchAsyncConsumptionToday.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully!");
      return { ...state, status: 200, consumption_today: payload };
    },
    [fetchAsyncConsumptionToday.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});

export const getConsumptionToday = (state) => state.consumptionToday; // nome da slice (user) e nome da propriedade (user)

export default consumptionTodaySlice.reducer;
