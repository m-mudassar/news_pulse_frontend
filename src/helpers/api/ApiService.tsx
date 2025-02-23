import {AxiosInstance} from "./AxiosInstance.tsx";

const handleResponse = async (response:any) => {
    if (response.status !== 200) {
        throw new Error(response.message || "Something went wrong");
    }
    return response.data;
};

export const apiService = {
    get: async (endpoint: string) => {
        const response = await AxiosInstance.get(endpoint);
        return handleResponse(response);
    },

    post: async (endpoint: string, body: any) => {
        const response = await AxiosInstance.post(endpoint, body);
        return handleResponse(response);
    },

    patch: async (endpoint: string, body: any) => {
        const response = await AxiosInstance.patch(endpoint, body);
        return handleResponse(response);
    },
};