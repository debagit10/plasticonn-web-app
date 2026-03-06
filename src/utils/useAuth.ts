import { create } from "zustand";

interface User {
  id: string;
  email: string;
  role: "collector" | "center";
  name: string;
  phone: string;
  status: string;
  centerType?: string;
  lat: number;
  lng: number;
}

interface AuthState {
  user: User | null;
  authLoading: boolean;
  coords: Coords | null;

  setUser: (user: User) => void;
  setCoords: (coords: Coords) => void;
  clearUser: () => void;
  setAuthLoading: (value: boolean) => void;
  initUser: (user: User) => void;
}

interface Coords {
  lat: number;
  lng: number;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  authLoading: false,
  coords: null,

  setUser: (user) => set({ user, authLoading: false }),
  setCoords: (coords) => set({ coords }),
  clearUser: () => set({ user: null, authLoading: false }),
  setAuthLoading: (value: boolean) => set({ authLoading: value }),
  initUser: (user) => set({ user, authLoading: false }),
}));

export const useAuth = () => {
  const { user, authLoading, coords } = useAuthStore();

  return {
    user,
    coords,
    authLoading,
    isCollector: user?.role === "collector",
    isCollection: user?.centerType === "collection",
    isRecycling: user?.centerType === "recycling",
  };
};
