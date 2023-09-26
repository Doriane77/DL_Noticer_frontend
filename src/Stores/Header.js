import { create } from "zustand";

const useHeaderStore = create((set) => ({
  seeMenu: true,
  invertSeeMenu: () => set((state) => ({ seeMenu: !state.seeMenu })),
}));

export default useHeaderStore;
