import { ref } from "vue";
import { defineStore } from "pinia";
import JwtService from "@/core/services/JwtService";
import ApiService from "@/core/services/ApiService";

export const useAuthStore = defineStore("auth", () => {
  const error = ref({});
  //   model: user: {name, surname, userName, apiToken, expire,id}
  const user = ref({});
  const isAuthenticated = ref(!!JwtService.getToken());

  function setAuth(authUser) {
    console.log(authUser);
    isAuthenticated.value = true;
    user.value = authUser;
    error.value = {};
    JwtService.saveToken(user.value.token);
  }

  function setError(error) {
    error.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {};
    error.value = {};
    JwtService.destroyToken();
  }

  async function login(credentials) {
    try {
      const response = await ApiService.post(
        "authenticate/gettoken",
        credentials
      );
      console.log(response.data.data);
      setAuth(response.data.data);
    } catch (error) {
      setError(response.data.error);
    }
  }

  async function verifyAuth() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      if (user.value.expire < Date.now()) purgeAuth();
    } else {
      purgeAuth();
    }
  }

  return {
    error,
    user,
    isAuthenticated,
    login,
    // logout,
    verifyAuth,
  };
});
