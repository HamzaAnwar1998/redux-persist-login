import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hostName } from "../../config/config";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCred) => {
    const request = await axios.post(
      `${hostName}api/admin/v1/auth/login`,
      userCred
    );
    const response = await request.data.data;
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userObj: null,
  },
  reducers: {
    clearUser: (state) => {
      state.userObj = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.userObj = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userObj = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { clearUser } = userSlice.actions;
