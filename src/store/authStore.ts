import { create } from "zustand";
import { User } from "../types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
}

interface RegisterData {
  razonSocial: string;
  rut: string;
  responsable: string;
  email: string;
  telefono: string;
  password: string;
}

// Mock user data
const mockUser: User = {
  id: "1",
  name: "T4NGIBLE Admin",
  email: "admin@demo.cl",
  organizacion: {
    id: "1",
    razonSocial: "T4NGIBLE SPA.",
    rut: "76.123.456-7",
    telefono: "+56 9 8765 4321",
  },
  role: "admin",
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Mock login logic
    if (email === "admin@demo.cl" && password === "demo123") {
      set({ user: mockUser, isAuthenticated: true });
      return true;
    }
    return false;
  },

  register: async (data: RegisterData) => {
    // Mock registration logic
    const newUser: User = {
      id: Date.now().toString(),
      name: data.responsable,
      email: data.email,
      organizacion: {
        id: Date.now().toString(),
        razonSocial: data.razonSocial,
        rut: data.rut,
        telefono: data.telefono,
      },
      role: "admin",
    };
    set({ user: newUser, isAuthenticated: true });
    return true;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
