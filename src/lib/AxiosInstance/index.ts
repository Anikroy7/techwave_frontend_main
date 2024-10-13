import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// axiosInstance.interceptors.request.use(
//   function (config) {
//     const cookieStore = cookies();
//     const accessToken = cookieStore.get("accessToken")?.value;

//     if (accessToken) {
//       config.headers.Authorization = accessToken;
//     }

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
