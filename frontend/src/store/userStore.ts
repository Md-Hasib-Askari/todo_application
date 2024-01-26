import {create} from "zustand";
import {UserStore} from "../types/user.ts";

export const userStore = create<UserStore>(set => ({
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn: boolean) => set({isLoggedIn})
  })
);