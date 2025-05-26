import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Some } from "../helpers/Some";

export type Cred = {
  userId: string;
  name: string;
  email: string;
  token: string;
  avatar?: string;
};

export function toCred(data: any): Cred {
  return {
    userId: Some.String(data?._id),
    name: Some.String(data?.name),
    email: Some.String(data?.email),
    token: Some.String(data?.token),
    avatar: Some.String(data?.avatar),
  };
}
const initialState = toCred({});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (_, action: PayloadAction<Cred>) => {
      return action.payload;
    },
    logOut: () => {
      return initialState;
    },
  },
});

export default authSlice.reducer;
export const { logIn, logOut } = authSlice.actions;
