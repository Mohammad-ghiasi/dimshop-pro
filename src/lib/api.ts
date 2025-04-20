import axios from "axios";
// import https from "https";
const api = axios.create({
  baseURL: "https://localhost:7260",
  timeout: 10000,
  // headers: {
  //   "Content-Type": "application/json",
  //   Authorization: `Bearer ${Cookies.get("auth-token") || ""}`,
  // },
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false, // **********
  // }),
});

export default api;
