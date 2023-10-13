import axios from "axios";
import { BASE_URL } from "../appconfig";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL
});
