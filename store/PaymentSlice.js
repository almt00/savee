import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const fetchAsyncPaymentSlice = createAsyncThunk(
  "user/fetchAsyncPayment",
  async (id) => {
    let payment_url = `https://savee-api.vercel.app/user/${id}/payment`;
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
  payment: {},
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  extraReducers: {
    [fetchAsyncPaymentSlice.pending]: () => {
      console.log("pending...");
    },
    [fetchAsyncPaymentSlice.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully!");
      return { ...state, status: 200, payment: payload  };
    },
    [fetchAsyncPaymentSlice.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});

export const getPayment = (state) => state.payment; // nome da slice (user) e nome da propriedade (user)

export default paymentSlice.reducer;
