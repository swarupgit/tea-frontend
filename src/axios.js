import axios from "axios";

const backendConfig = {
  baseURL: process.env.REACT_APP_ADMIN_BACKEND_URL,
};

const backend = axios.create(backendConfig);

backend.interceptors.request.use((config) => {
  const storage = JSON.parse(localStorage.getItem("token"));
  if (storage?.accessToken) {
    config.headers.Authorization = `Bearer ${storage.accessToken}`;
  }

  return config;
});

backend.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default backend;
