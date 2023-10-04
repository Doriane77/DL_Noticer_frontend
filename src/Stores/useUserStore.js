import axios from "axios";
import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  users: null,
  token: null,
  seeModalForms: false,
  openForms: "login",
  failMessage: null,

  disconnect: () =>
    set(() => ({
      user: null,
      token: null,
      seeModalForms: false,
      openForms: "login",
      failMessage: null,
    })),
  changeOpenForms: (nameForm) => set(() => ({ openForms: nameForm })),
  changeTextForm: () => set(() => ({ failMessage: null })),
  setseeModalForms: () =>
    set((state) => ({ seeModalForms: !state.seeModalForms })),
  open: () => set(() => ({ seeModalForms: true, openForms: "login" })),
  close: () =>
    set(() => ({
      seeModalForms: false,
      failMessage: null,
      openForms: "login",
    })),
  deleteUser: async () => {
    const { token } = useUserStore.getState();

    if (!token) {
      set({
        failMessage: "Token manquant. Impossible de supprimer l'utilisateur.",
      });
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_URL}/user/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({
        user: null,
        token: null,
        seeModalForms: false,
        failMessage: null,
      });
    } catch (error) {
      set({
        failMessage:
          error.response.data.message || "Erreur lors de la suppression",
      });
    }
  },
  allUsers: async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/user/all`);
      set({ users: response.data });
    } catch (error) {
      set({
        failMessage: error?.response?.data?.message,
      });
    }
  },
  updateUser: async (username, email, password) => {
    const { user, token } = useUserStore.getState();
    const userId = user ? user.id : null;
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
          error?.response?.data?.message || "Erreur lors de la mise à jour",
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
      set({
        messageForm: error?.response?.data?.message,
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
