import axios from "axios";
const url =
  process.env.NODE_ENV === "production" ? "api" : "http://localhost:5000/api";
const apiInstance = axios.create({ baseURL: url });
export default apiInstance;
