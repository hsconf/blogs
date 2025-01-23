import axios from "axios";

const API_URL = "http://localhost:8000";

const axiosApi = axios.create({
    baseURL: API_URL,
})

export default axiosApi;