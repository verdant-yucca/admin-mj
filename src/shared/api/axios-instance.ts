import axios, { AxiosPromise, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.response.use(
    config => config.data,
    config => {
        const data = config.response.data;

        return Promise.reject(data);
    }
);

export default <T = void>(config: AxiosRequestConfig) => {
    const headers: RawAxiosRequestHeaders = {};

    const request: AxiosPromise<T> = axiosInstance({
        ...config,
        headers: { ...config.headers, ...headers }
    });

    return request as unknown as Promise<T>;
};
