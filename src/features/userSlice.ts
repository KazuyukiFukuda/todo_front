import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { RootState } from "../app/store";

interface USER {
  id: number;
  display_name: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { id: "", display_name: "" },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { id: "", display_name: "" };
    },
    updateUserProfile: (state, action: PayloadAction<USER>) => {
      state.user.display_name = action.payload.display_name;
    },
  },
});

export const { login, logout, updateUserProfile } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;
