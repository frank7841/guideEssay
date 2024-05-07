import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface payloadInfo {
  essay: string;
  work: string;
  pagesCount: number;
  deadline: string;
  deadlinePrice: number;
  workText: string;
  workAmount: number;
  levelText: string;
  levelAmount: number;
  finalPrice: number;
  alignmentAmount: number;
}

interface OrderLayout {
  value: payloadInfo;
}

// Define the initial state using that type
const initialState: OrderLayout = {
  value: {
    essay: "",
    work: "",
    pagesCount: 1,
    deadline: new Date(
      new Date().setHours(new Date().getHours() + 1)
    ).toString(),
    deadlinePrice: 0,
    workText: "",
    workAmount: 0,
    levelText: "",
    levelAmount: 0,
    finalPrice: 0,
    alignmentAmount: 0,
  },
};

export const orderSlice = createSlice({
  name: "orderInfo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<payloadInfo>) => {
      state.value = action.payload;
    },
  },
});

export const { addOrder } = orderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectOrder = (state: RootState) => state.orderInfo.value;

export default orderSlice.reducer;
