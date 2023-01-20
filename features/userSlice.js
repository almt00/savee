import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAsyncUser = createAsyncThunk(
  "user/fetchAsyncUser",
  async (id) => {
    let user_url = `../api/user_${id}`;

    const response = await fetch(user_url);
    let actualData = await response.json();
    let actualDataObject = await JSON.parse(actualData);
    return actualDataObject;
  }
);

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [fetchAsyncUser.pending]: () => {
      console.log("pending...");
    },
    [fetchAsyncUser.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully!", payload);
      return { ...state, user: payload };
    },
    [fetchAsyncUser.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});

export const getUser = (state) => state.user.user; // nome da slice (agents) e nome da propriedade (agents)

export default userSlice.reducer;
