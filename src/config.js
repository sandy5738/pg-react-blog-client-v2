import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://pg-blog-api.onrender.com/api/",
});

export const PF = "https://pg-blog-api.onrender.com/images/";
