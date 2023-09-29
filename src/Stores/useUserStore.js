import axios from "axios";
import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  seeModalForms: false,
  openForms: "login",
  failMessage: null,
  changeOpenForms: (nameForm) => set(() => ({ openForms: nameForm })),
  changeTextForm: () => set(() => ({ failMessage: null })),
  setseeModalForms: () =>
    set((state) => ({ seeModalForms: !state.seeModalForms })),
  open: () => set(() => ({ seeModalForms: true })),
  close: () =>
    set(() => ({
      seeModalForms: false,
      failMessage: null,
      openForms: "login",
    })),
  registerUser: async (username, email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/user/register`,
        { username, email, password }
      );
      set({ user: response.data, failMessage: null, seeModalForms: false });
    } catch (error) {
      console.log("error: ", error);
      set({
        failMessage: error.response.data.message,
      });
    }
  },
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
