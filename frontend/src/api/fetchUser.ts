import axios from "axios";
import {User} from "../types/user";

axios.interceptors.request.use(
    (config) => {
      const token = document.cookie as string;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.log(error)
      Promise.reject(error);
    }
);

export async function register(formData: User) {
  try {
    return await axios.post(
        "http://localhost:5000/api/v1/register/",
        formData
    );
  } catch (e: any) {
    return e.response;
  }
}

export async function login(formData: User) {
  try {
    return await axios.post(
        "http://localhost:5000/api/v1/login/",
        formData
    );
  } catch (e: any) {
    return e.response;
  }
}

export const isLoggedIn = async (token: string) => {
  try {
    return await axios.post(
        "http://localhost:5000/api/v1/isLoggedIn/",
        {token}
    );
  } catch (e: any) {
    return e.response;
  }
};

export async function logout() {
  return await axios.get(
      `http://localhost:5000/api/v1/logout/`
  );
}
