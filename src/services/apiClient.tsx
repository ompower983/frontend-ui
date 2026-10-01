import axios, { AxiosInstance } from "axios";
import CookiePersistence from "@/utils/cookiePersistence";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!baseURL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not configured",
  );
}
export class Client {
  query(arg0: {
    query: any;
    fetchPolicy: string;
  }): { data: any } | PromiseLike<{ data: any }> {
    throw new Error("Method not implemented.");
  }
  api: AxiosInstance;

  constructor() {
    axios.defaults.baseURL = `${baseURL}/api`;
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios.defaults.responseEncoding = "utf8";

    this.api = axios.create({});

    this.api.interceptors.request.use(
      (config) => {
        config.headers["ngrok-skip-browser-warning"] = "true";
        config.headers["accept-language"] = "en";
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response?.status === 401 &&
          window.location.pathname !== "/login"
        ) {
          if (typeof window !== "undefined") {
            localStorage.clear();
            new CookiePersistence().removeItem("access_token");
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      },
    );
  }
}