import axios from "axios";
import { useAuthStore } from "../../features/security/store/useAuthStore";
// URL Y PERTO QUE CONECTA EL BACKEND
const API_URL = "https://localhost:7166/api";

// Aqui se encuentran las instancias del web APIA

// Para confirmar el token del usuario
const setAuthToken = () => {
  const auth = getAuth();
  if (auth) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
// para obtener la autentificacion
const getAuth = () => {
  const lsToken = localStorage.getItem("token");
  const lsRefreshToken = localStorage.getItem("refreshToken");
  if (lsToken && lsRefreshToken) {
    return { token: lsToken, refreshToken: lsRefreshToken };
  }
  return null;
};

setAuthToken();

let refreshingTokenPromise = null;

//instancia de axios la url donde se encuentra nuestro backend
const webApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// interceptor para el refresh token 
webApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = getAuth();

    if (
      error.response &&
      error.response.status === 401 &&
      auth &&
      !refreshingTokenPromise
    ) {
      refreshingTokenPromise = axios
        .post(
          "auth/refresh-token",
          {
            token: auth.token ?? "",
            refreshToken: auth.refreshToken ?? "",
          },
          { withCredentials: true }
        )
        .then((response) => {
          const setSession = useAuthStore.getState().setSession;
          const user = {
            email: response.data.data.email,
            fullName: response.data.data.fullName,
            tokenExpiration: response.data.data.tokenExpiration,
          };
          setSession(
            user,
            response.data.data.token,
            response.data.data.refreshToken
          );
          setAuthToken();
          refreshingTokenPromise = null;
          return response.data.data.token;
        })
        .catch((err) => {
          console.error("Error refreshing token", err);
          const logout = useAuthStore.getState().logout;
          logout();
          refreshingTokenPromise = null;

          window.location.href = "/home";

          return Promise.reject(error);
        });
    }

    if (refreshingTokenPromise) {
      await refreshingTokenPromise;
      error.config.headers["Authorization"] = `Bearer ${getAuth().token}`;
      return webApi(error.config);
    }

    return Promise.reject(error);
  }
);

webApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { webApi, API_URL };
