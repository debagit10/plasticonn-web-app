import { create } from "zustand";

interface User {
  _id: string;
  email?: string;
  role: "collector" | "center";
  name: string;
  firstName?: string;
  lastName?: string;
  address: string;
  phone?: string;
  status: string;
  centerType?: string;
  capacity?: string;
  centerId?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  operatingHours?: string;
  materialsAccepted?: string[];
  lat: number;
  lng: number;
  image?: {
    url: string;
    public_id?: string;
  } | null;
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
    isCenter: user?.role === "center",
  };
};
