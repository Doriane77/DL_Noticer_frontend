import { create } from "zustand";

const useHeaderStore = create((set) => ({
  seeMenu: false,
  invertSeeMenu: () => set((state) => ({ seeMenu: !state.seeMenu })),
  close: () => set((state) => ({ seeMenu: false })),
}));

export default useHeaderStore;
