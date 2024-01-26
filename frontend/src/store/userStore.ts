import {create} from "zustand";
import {UserStore} from "../types/user.ts";

export const userStore = create<UserStore>(set => {
  return {
    isLoggedIn: false,
    setIsLoggedIn: () => set((prevState) => ({isLoggedIn: !prevState.isLoggedIn}))
  };
});