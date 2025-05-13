import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Some } from "../helpers/Some";

export type Cred = {
  userId: string;
  name: string;
  email: string;
  token: string;
  avatar?: string;
};

export type StoreState = {
  cred: Cred;
  signIn: (cred: Cred) => void;
  signOut: () => void;
};

const emptyCred = toCred({});

const useAuthStore = create<
  StoreState,
  [["zustand/devtools", StoreState], ["zustand/persist", StoreState]]
>(
  devtools(
    persist(
      (set) => ({
        cred: emptyCred,
        signIn: (cred) => set({ cred }),
        signOut: () => set({ cred: emptyCred }),
      }),
      { name: "smart-resume" }
    ),
    {
      enabled: true,
    }
  )
);

function toCred(data: any): Cred {
  return {
    userId: Some.String(data?._id),
    name: Some.String(data?.username),
    email: Some.String(data?.email),
    token: Some.String(data?.token),
    avatar: Some.String(data?.avatar),
  };
}
export { useAuthStore };
