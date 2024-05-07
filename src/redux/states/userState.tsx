import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface payloadInfo {
  id: string;
  role: string;
  username: string;
}

interface UserLayout {
  value: {
    id: string;
    role: string;
    username: string;
  };
}

// Define the initial state using that type
const initialState: UserLayout = {
  value: {
    id: "",
    role: "",
    username: "",
  },
};

export const userSlice = createSlice({
  name: "userInfo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<payloadInfo>) => {
      state.value = action.payload;
    },
    updateRole: (state, action: PayloadAction<string>) => {
      state.value.role = action.payload;
    },
  },
});

export const { addUser, updateRole } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.userInfo.value;

export default userSlice.reducer;
