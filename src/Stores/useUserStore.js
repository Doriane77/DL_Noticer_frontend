import axios from "axios";
import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  seeModalForms: false,
  failMessage: null,
  setseeModalForms: () =>
    set((state) => ({ seeModalForms: !state.seeModalForms })),
  open: () => set(() => ({ seeModalForms: true })),
  close: () => set(() => ({ seeModalForms: false })),
  loginUser: async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/user/login`,
        {
          email,
          password,
        }
      );
      set({ user: response.data, failMessage: null, seeModalForms: false });
    } catch (error) {
      set({
        failMessage: "Email ou mot de passe invalide .",
      });
    }
  },
}));

export default useUserStore;
