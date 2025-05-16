import axios from "axios";
import https from "https";


const agent = new https.Agent({  
  rejectUnauthorized: false, // ⛔ فقط در حالت تست یا dev
});
const api = axios.create({
  baseURL: "https://localhost:7260",
  timeout: 10000,
  httpsAgent: agent,
  // headers: {
  //   "Content-Type": "application/json",
  //   Authorization: `Bearer ${Cookies.get("auth-token") || ""}`,
  // },
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false, // **********
  // }),
});

export default api;
