import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAsyncGroupDetails = createAsyncThunk(
  "user/fetchAsyncGroupDetails",
  async (id) => {
    let user_url = `../api/user_${id}`;
    const response = await fetch(user_url);
    let actualData = await response.json();
    let actualDataObject = await JSON.parse(actualData);
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
      console.log("fetched successfully!", payload);
      return { ...state, groupDetails: [state.groupDetails, payload] };
    },
    [fetchAsyncGroupDetails.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});



export const getgroupDetails = (state) => state.groupDetails.groupDetails; // nome da slice (user) e nome da propriedade (user)


export default groupDetailsSlice.reducer;