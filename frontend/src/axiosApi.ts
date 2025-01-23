import axios from "axios";

const API_URL = "https://blogs-7dwm.onrender.com";

const axiosApi = axios.create({
    baseURL: API_URL,
})

export default axiosApi;