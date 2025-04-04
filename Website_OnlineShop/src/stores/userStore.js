//ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir

import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    isLoggedIn: false,
    user: null, // Info de l'utilisateur connecte
    developerEmail: "dev@gmail.com"
  }),
  actions: {
    login(userData) {
      this.isLoggedIn = true;
      this.user = userData;
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null; // vider l'utilisateur
    },
  },
  getters: {
    getUser: (state) => state.user,
    getUserName: (state) => state.user?.name || 'Utilisateur', // nom d'utilisateur
    getUserImage: (state) => state.user?.picture || '', // image
    isDeveloper: (state) => state.user?.email === state.developerEmail // Verifier si c'est un developpeur
  },
});
