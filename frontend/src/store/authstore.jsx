import { create } from "zustand";
import axios from "axios";

const API_URL = "/api/auth";

axios.defaults.withCredentials = true;

// Helper function to get user data from localStorage
const getUserFromStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

export const useAuthStore = create((set) => ({
  user: getUserFromStorage(),
  isAuthenticated: !!getUserFromStorage(),
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  // Sign up function
  signup: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, formData);
      const userData = response.data.data;
      localStorage.setItem("user", JSON.stringify(userData)); // Persist user to localStorage
      set({ user: userData, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  // Verify email
  verifyEmail: async (otp, userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verifyemail`, { otp, userId });
      return response.data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  // Verify phone
  verifyPhone: async (otp, userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verifyphone`, { otp, userId });
      return response.data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error verifying phone",
        isLoading: false,
      });
      throw error;
    }
  },

  // Verify JWT
  verifyjwt: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/verifyjwt`);
      const userData = response.data.data.loggedInuser;
      console.log(userData);
      localStorage.setItem("user", JSON.stringify(userData)); // Persist user to localStorage
      set({ user: userData, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error verifying JWT",
        isLoading: false,
      });
      return { success: false }; // Return false if verification fails
    }
  },

  // Logout function
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.get(`${API_URL}/logout`); // Call logout API
      localStorage.removeItem("user"); // Clear user data from localStorage
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error during logout",
        isLoading: false,
      });
      throw error;
    }
  },
  login: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      const userData = response.data.data;
      localStorage.setItem("user", JSON.stringify(userData)); // Persist user to localStorage
      set({ user: userData, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  sendInterviewemail: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`/api/form/sendinterviewform`, formData);
      set({ isLoading: false });
       return response
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error sending form",
        isLoading: false,
      });
      throw error;
    }
  },
}));
