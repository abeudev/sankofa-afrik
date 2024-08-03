import { defineStore } from "pinia";

import router from "@/router";
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
interface Profile {
  id: string;
  name: string;
  avatar: string;
  created: boolean;
}
const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    user: null,
    profile: null as Profile | null,
  }),

  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, paths: ["isLoggedIn"] },
      // { storage: sessionStorage, paths: ["profile"] }
    ],
  },

  getters: {},

  actions: {
    setLoggedIn(payload: boolean) {
      this.isLoggedIn = payload;
    },

    registerWithEmailAndPassword(email: string, password: string) {
      router.push("/");
    },

    async loginWithEmailAndPassword(username: string, password: string) {


        const user = await fetchWrapper.post(`${baseUrl}/login`, { username, password });

        // update pinia state
        this.user = user;
        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        // redirect to previous url or default to home page
        //router.push(this.returnUrl || '/');
        router.push("/");
      },

    loginWithGoogle() {
      router.push("/");
    },

    logout() {
      router.push({ name: "auth-signin" });
    },
  },
});
