import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const fetchAsyncGroupDetails = createAsyncThunk(
  "groupDetails/fetchAsyncGroupDetails",
  async (id) => {
    let groupDetails_url = `https://savee-api.vercel.app/consumption/house/${id}`;
    const response = await fetch(groupDetails_url, {
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
  groupDetails: {},
};

const groupDetailsSlice = createSlice({
  name: "groupDetails",
  initialState,
  extraReducers: {
    [fetchAsyncGroupDetails.pending]: () => {
      console.log("pending...");
    },
    [fetchAsyncGroupDetails.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully!");
      return {
        ...state,
        status: 200,
        groupDetails: payload,
      };
    },
    [fetchAsyncGroupDetails.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});

export const getGroupDetails = (state) => state.groupDetails; // nome da slice (user) e nome da propriedade (user)

export default groupDetailsSlice.reducer;
