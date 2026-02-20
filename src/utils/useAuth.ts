import { create } from "zustand";

interface User {
  id: string;
  email: string;
  role: "collector" | "center";
  name: string;
  phone: string;
}

interface AuthState {
  user: User | null;
  authLoading: boolean;

  setUser: (user: User) => void;
  clearUser: () => void;
  setAuthLoading: (value: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  authLoading: true,
  setUser: (user) => set({ user, authLoading: false }),
  clearUser: () => set({ user: null, authLoading: false }),
  setAuthLoading: (value: boolean) => set({ authLoading: value }),
}));

export const useAuth = () => {
  const { user, authLoading } = useAuthStore();

  return {
    user,
    authLoading,
    role: user?.role,
    isCollector: user?.role === "collector",
    isCenter: user?.role === "center",
  };
};
