import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Some } from "../helpers/Some";
import { ResumeForm } from "../screens/Home/type";

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

export type StoreState = {
  cred: Cred;
  signIn: (cred: Cred) => void;
  signOut: () => void;
  resumeForms: Array<ResumeForm>;
  addResumeToStore: (r: ResumeForm) => void;
  removeResumeFromStore: (idx: number) => void;
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
        signOut: () => set({ cred: emptyCred, resumeForms: [] }),
        resumeForms: [],
        addResumeToStore: (resume) =>
          set((state) => ({
            ...state,
            resumeForms: state.resumeForms.concat(resume),
          })),
        removeResumeFromStore: (idx) =>
          set((state) => ({
            ...state,
            resumeForms: state.resumeForms.filter((_r, index) => index !== idx),
          })),
      }),
      { name: "smart-resume" }
    ),
    {
      enabled: true,
    }
  )
);

export { useAuthStore };
