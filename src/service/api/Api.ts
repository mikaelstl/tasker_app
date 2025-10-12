import axios, { type AxiosInstance } from "axios"
import type { ApiResponse } from "../types/response/response";
import type { ApiError } from "../types/response/error";

export class Api {
  private api: AxiosInstance;

  private get path(): string { return "http://localhost:3000"}

  constructor() {
    this.api = axios.create({
      baseURL: this.path,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.config();
  }

  async post<T>(params: { route: string, data: T }): Promise<ApiResponse> {
    const response = await this.api.post(params.route, params.data);
    return response.data;
  }

  private config() {
    // APPLYNG TOKEN INTO REQUESTS
    this.api.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('token');
      
        if (token) config.headers['Authorization'] = `Bearer ${token}`;

        return config;
      },
      (err) => {
        alert(err?.response.data);
        return Promise.reject(err)
      }
    );

    this.api.interceptors.response.use(
      (response: any) => response.data,
      (err): Promise<ApiError> => {
        const error: ApiError = err.response.data;

        return Promise.reject(error);
      }
    );
  }
}