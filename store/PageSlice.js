import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const setPage = createAsyncThunk(
  "page/setPage",
  async (page) => {
    /* let user_url = `../api/user_${id}`;
    const response = await fetch(user_url);
    let actualData = await response.json();
    let actualDataObject = await JSON.parse(actualData); */
    return page;
  }
);

const initialState = {
  page: "",
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  extraReducers: {
    [setPage.pending]: () => {
      console.log("pending...");
    },
    [setPage.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully!");
      return { ...state, page: payload };
    },
    [setPage.rejected]: () => {
      console.log("rejected :( ");
    },
  },
});



export const getPage = (state) => state.page.page; // nome da slice (user) e nome da propriedade (user)


export default pageSlice.reducer;
