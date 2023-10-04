import axios from "axios";
import { create } from "zustand";

const useAdminStore = create((set, get) => ({
  admin: null,
  allAdmin: null,
  token: null,
  failMessage: null,
  openForm: "login",
  StatusMessage: null,
  changeTextForm: () => set(() => ({ failMessage: null, StatusMessage: null })),
  changeOpenForms: (nameForm) => set(() => ({ openForm: nameForm })),
  disconnect: () => set({ admin: null, token: null }),
  login: async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/admin/login`,
        {
          email,
          password,
        }
      );
      set({
        admin: response.data.user,
        token: response.data.token,
        failMessage: null,
      });
    } catch (error) {
      set({ StatusMessage: null, failMessage: error?.response?.data?.message });
    }
  },
  all: async () => {
    const { token } = useAdminStore.getState();
    if (!token) {
      set({ failMessage: "Utilisateur non authentifié ou token manquant." });
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ allAdmin: response.data });
    } catch (error) {
      set({
        failMessage: error?.response?.data?.message,
      });
    }
  },
  register: async (email, username, password) => {
    const { token } = useAdminStore.getState();
    if (!token) {
      set({ failMessage: "Utilisateur non authentifié ou token manquant." });
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/admin/register`,
        {
          email,
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({
        StatusMessage: "Utilisateur créer avec succès !",
        failMessage: null,
      });
    } catch (error) {
      set({
        StatusMessage: null,
        failMessage:
          error?.response?.data?.message ||
          error?.response?.data?.details[0]?.message,
        messageForm: error?.response?.data?.message,
      });
    }
  },
}));

export default useAdminStore;
