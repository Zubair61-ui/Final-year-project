import { create } from 'zustand';

interface UserState {
  isAuth: boolean;
  setAuth: (isAuth: boolean) => void;
}

export const useUser = create<UserState>((set) => ({
  isAuth: false,
  setAuth: (isAuth) => set({ isAuth }),
}));