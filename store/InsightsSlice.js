import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const fetchAsyncInsightsSlice = createAsyncThunk(
  "insights/fetchAsyncInsights",
  async ({ userid, paymentid }) => {
    let insights_url = `https://savee-api.vercel.app/user/${userid}/payment/${paymentid}/insights`;
    const response = await fetch(insights_url,{
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
  insights: {},
};

const insightsSlice = createSlice({
  name: "insights",
  initialState,
  extraReducers: {
    [fetchAsyncInsightsSlice.pending]: () => {
      console.log("pending...");
    },
    [fetchAsyncInsightsSlice.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully!");
      return { ...state, status: 200, insights: payload };
    },
    [fetchAsyncInsightsSlice.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});

export const getInsights = (state) => state.insights; // nome da slice (user) e nome da propriedade (user)

export default insightsSlice.reducer;
