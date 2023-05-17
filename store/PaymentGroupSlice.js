import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const fetchAsyncPaymentGroupSlice = createAsyncThunk(
  "user/fetchAsyncPaymentGroup",
  async (id) => {
    let payment_url = `https://savee-api.vercel.app/house/${id}/payment`;
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
  paymentGroup: {},
};

const paymentGroupSlice = createSlice({
  name: "paymentGroup",
  initialState,
  extraReducers: {
    [fetchAsyncPaymentGroupSlice.pending]: () => {
      console.log("pending...");
    },
    [fetchAsyncPaymentGroupSlice.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully!");
      return { ...state, status: 200, paymentGroup: payload  };
    },
    [fetchAsyncPaymentGroupSlice.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});

export const getPaymentGroup = (state) => state.paymentGroup; // nome da slice (user) e nome da propriedade (user)

export default paymentGroupSlice.reducer;
