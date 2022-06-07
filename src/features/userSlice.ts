import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface USER {
  id: number;
  display_name: string;
  email: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { id: "", display_name: "", email: "" },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { id: "", display_name: "", email: "" };
    },
    updateUserProfile: (state, action: PayloadAction<USER>) => {
      state.user.display_name = action.payload.display_name;
      state.user.email = action.payload.email;
    },
  },
});

export const { login, logout, updateUserProfile } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;
