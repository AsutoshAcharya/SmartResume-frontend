import { create } from "zustand";
import { persist } from "zustand/middleware";

type StoreState = {
  value: number;
  increment: () => void;
  decrement: () => void;
  incrementByValue: (val: number) => void;
};
export const useCounterStore = create<
  StoreState,
  [["zustand/persist", StoreState]]
>(
  persist(
    (set) => ({
      value: 0,
      increment: () =>
        set((state) => ({
          value: state.value + 1,
        })),
      decrement: () =>
        set((state) => ({
          value: state.value - 1,
        })),
      incrementByValue: (val) =>
        set((state) => ({
          value: state.value + val,
        })),
    }),
    { name: "counter" }
  )
);
