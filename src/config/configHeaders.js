// import axios from "axios";

// const configHeaders = () => {
//   const token = localStorage.getItem("token");
//   console.log("axios token", token);
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };
//   return headers;
// }

// export const BaseURL = "http://localhost:5000/";

// export const http = axios.create({
//   baseURL: BaseURL,
//   headers: configHeaders(),
// });


import axios from "axios";

export const BaseURL = "http://localhost:5000/";

// Tạo axios instance
export const http = axios.create({
  baseURL: BaseURL,
});


http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);