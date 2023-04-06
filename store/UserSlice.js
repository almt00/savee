import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAsyncUser = createAsyncThunk(
  "user/fetchAsyncUser",
  async (id) => {
    let user_url = "https://savee-api.vercel.app/user/`${id}`";
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
      console.log("fetched successfully!");
      return { ...state, user: payload };
    },
    [fetchAsyncUser.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});

export const getUser = (state) => state.user

 // nome da slice (user) e nome da propriedade (user)


export default userSlice.reducer;
