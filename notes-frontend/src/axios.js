import axios from "axios";

const baseURL =
  process.env.ENVIRONMENT === "production"
    ? process.env.REACT_APP_API_URL
    : "http://localhost:4000";

export const axiosInstance = axios.create({
  baseURL,
});
