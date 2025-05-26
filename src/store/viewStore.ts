import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ViewStoreState = {
  isViewingResume: boolean;
  onViewAction: (val: boolean) => void;
};

const useViewStore = create<
  ViewStoreState,
  [["zustand/devtools", ViewStoreState]]
>(
  devtools(
    (set) => ({
      isViewing: false,
      onViewAction: (val) =>
        set((state) => ({ ...state, isViewingResume: val })),
    }),
    { name: "view-store" }
  )
);

export { useViewStore };
