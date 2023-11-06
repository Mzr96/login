import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/JwtService";

class ApiService {
  static vueInstance;

  static init(vueApp) {
    this.vueInstance = vueApp;
    this.vueInstance.use(VueAxios, axios);
    this.vueInstance.axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
  }

  static setHeader() {
    console.log("Setting Header");
    console.log(`Bearer ${JwtService.getToken()}`);
    ApiService.vueInstance.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;
    console.log(
      ApiService.vueInstance.axios.defaults.headers.common["Authorization"]
    );
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
      "application/json";
  }

  static query(resource, params) {
    return this.vueInstance.axios.get(resource, params);
  }

  static get(resource, slug = "") {
    return this.vueInstance.axios.get(`${resource}/${slug}`);
  }

  static post(resource, params) {
    return this.vueInstance.axios.post(`${resource}`, params);
  }
}

export default ApiService;
