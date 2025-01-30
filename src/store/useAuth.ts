import { IUser } from "types/userType";
import { create } from "zustand";

interface IAuth {
  user: IUser | null;
  isAuthenticated: boolean;
  logout: () => void;
  login: (currentUser: IUser) => void;
}

export const useAuth = create<IAuth>((set) => ({
  user: null,
  isAuthenticated: false,
  logout: () => set({ user: null, isAuthenticated: false }),
  login: (currentUser: IUser) =>
    set({ user: currentUser, isAuthenticated: true }),
}));
