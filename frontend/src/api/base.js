import axios from "axios";
import Cookies from "js-cookie";

export function createApiCommunicator() {
  const instance = axios.create({
    baseURL: "http://192.168.29.122:1000/api",
    timeout: 180000,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Accept: "application/json",
      Expires: 0,
    },
  });

  instance.interceptors.request.use(async (config) => {
    // Fetch the token from cookies
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.warn("Access token not found.");
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error?.response?.status === 401) {
        const event = new CustomEvent("UNAUTHORIZED_401", { detail: error });
        document.dispatchEvent(event);
      }
      return Promise.reject(error);
    },
  );

  return instance;
}

const claimCommunicator = createApiCommunicator();

export { claimCommunicator };
