import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: number;
};
const initialState: InitialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
    decrement: (state) => {
      state.value--; //this will be handled by redux it actually wont mutate the state
    },
    incrementByValue: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});
export const { increment, decrement, incrementByValue } = counterSlice.actions;
export default counterSlice.reducer;
