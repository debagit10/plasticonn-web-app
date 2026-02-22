import { create } from "zustand";

interface User {
  id: string;
  email: string;
  role: "collector" | "center";
  name: string;
  phone: string;
  centerType?: string;
}

interface AuthState {
  user: User | null;
  authLoading: boolean;

  setUser: (user: User) => void;
  clearUser: () => void;
  setAuthLoading: (value: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: "1",
    name: "Demo Center",
    role: "center",
    email: "demo@example.com",
    phone: "+1 555 123 4567",
    centerType: "collection",
  },
  authLoading: false,

  setUser: (user) => set({ user, authLoading: false }),
  clearUser: () => set({ user: null, authLoading: false }),
  setAuthLoading: (value: boolean) => set({ authLoading: value }),
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
