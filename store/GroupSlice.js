import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAsyncGroup = createAsyncThunk(
  "group/fetchAsyncGroup",
  async (id) => {
    let group_url = `../api/group_${id}`;
    const response = await fetch(group_url);
    let actualData = await response.json();
    let actualDataObject = await JSON.parse(actualData);
    return actualDataObject;
  }
);
const initialState = {
  group: {},
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  extraReducers: {
    [fetchAsyncGroup.pending]: () => {
      console.log("pending...");
    },
    [fetchAsyncGroup.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully!", payload);
      return { ...state, group: payload };
    },
    [fetchAsyncGroup.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});

export const getGroup = (state) => state.group.group; 


export default groupSlice.reducer;
