import axios from "axios";
import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  token: null,
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
  updateUser: async (username, email, password) => {
    const { user, token } = useUserStore.getState();
    const userId = user ? user.id : null;
    console.log("userId, token: ", userId, token);

    if (!userId || !token) {
      set({ failMessage: "Utilisateur non authentifié ou token manquant." });
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/user/update`,
        {
          userId,
          username,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({
        user: response.data.user,
        failMessage: null,
        seeModalForms: false,
      });
    } catch (error) {
      set({
        failMessage:
          error.response.data.message || "Erreur lors de la mise à jour",
      });
    }
  },
  registerUser: async (username, email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/user/register`,
        { username, email, password }
      );
      set({
        user: response.data.user,
        token: response.data.token,
        failMessage: null,
        seeModalForms: false,
      });
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
      set({
        user: response.data.user,
        token: response.data.token,
        failMessage: null,
        seeModalForms: false,
      });
    } catch (error) {
      set({
        failMessage: "Email ou mot de passe invalide .",
      });
    }
  },
}));

export default useUserStore;
