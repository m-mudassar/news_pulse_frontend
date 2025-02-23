import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
});
