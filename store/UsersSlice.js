import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAsyncUsers = createAsyncThunk(
  "user/fetchAsyncUsers",
  async (id) => {
    let users_url = `https://savee-api.vercel.app/user`;
    const response = await fetch(users_url);
    let actualData = await response.json();
    let actualDataObject = await actualData;
    return actualDataObject;
  }
);

const initialState = {
  users: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: {
    [fetchAsyncUsers.pending]: () => {
      console.log("pending...");
    },
    [fetchAsyncUsers.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully!");
      return { ...state, status: 200, users: payload };
    },
    [fetchAsyncUsers.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});

export const getUsers = (state) => state.users; // nome da slice (user) e nome da propriedade (user)

export default usersSlice.reducer;
