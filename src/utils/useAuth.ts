import { create } from "zustand";

interface User {
  id: string;
  email: string;
  role: "collector" | "center";
  name: string;
  phone: string;
  status: string;
  centerType?: string;
}

interface AuthState {
  user: User | null;
  authLoading: boolean;

  setUser: (user: User) => void;
  clearUser: () => void;
  setAuthLoading: (value: boolean) => void;
  initUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  authLoading: false,

  setUser: (user) => set({ user, authLoading: false }),
  clearUser: () => set({ user: null, authLoading: false }),
  setAuthLoading: (value: boolean) => set({ authLoading: value }),
  initUser: (user) => set({ user, authLoading: false }),
}));

export const useAuth = () => {
  const { user, authLoading } = useAuthStore();

  return {
    user,
    authLoading,
    isCollector: user?.role === "collector",
    isCollection: user?.centerType === "collection",
    isRecycling: user?.centerType === "recycling",
  };
};
