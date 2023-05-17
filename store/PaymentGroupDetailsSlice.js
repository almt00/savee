import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


export const fetchAsyncPaymentGroupDetailsSlice = createAsyncThunk(
  "paymentGroupDetails/fetchAsyncPaymentGroupDetails",
  async ({ houseid, paymentid }) => {
    let payment_url = `https://savee-api.vercel.app/house/${houseid}/payment/${paymentid}`;
    const response = await fetch(payment_url,{
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
  paymentGroupDetails: {},
};

const paymentGroupDetailsSlice = createSlice({
  name: "paymentGroupDetails",
  initialState,
  extraReducers: {
    [fetchAsyncPaymentGroupDetailsSlice.pending]: () => {
      console.log("pending...");
    },
    [fetchAsyncPaymentGroupDetailsSlice.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully!");
      return { ...state, status: 200, paymentGroupDetails: payload };
    },
    [fetchAsyncPaymentGroupDetailsSlice.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});

export const getPaymentGroupDetails = (state) => state.paymentGroupDetails; // nome da slice (user) e nome da propriedade (user)

export default paymentGroupDetailsSlice.reducer;
