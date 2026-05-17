import axios from "axios";

export const proxyServerApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN + "/api",
  withCredentials: true, // дозволяє axios працювати з cookie
});
