export type User = {
  email: string,
  password: string
}

export interface UserStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}