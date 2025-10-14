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
    // APPLYNG TOKEN INTO REQUEST
    this.api.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('token');
      
        if (token) config.headers['Authorization'] = `Bearer ${token}`;

        return config;
      },
      (err) => {
        if (["ECONNREFUSED", "ENOTFOUND", "ETIMEDOUT", "ERR_NETWORK"].includes(err.code || "") && !err.response) {
          console.warn("🚫 Falha de rede ou CORS bloqueado.");  
          
          return Promise.reject({
            status: 500,
            errors: [{
              level: 'critical',
              message: 'Server offline'
            }],
            timestamp: new Date().toISOString(),
            path: '/'
          });
        }

        const error: ApiError = err.response.data;
        
        return Promise.reject(error)
      }
    );

    this.api.interceptors.response.use(
      (response: any) => response.data,
      (err): Promise<ApiError> => {
        if (["ECONNREFUSED", "ENOTFOUND", "ETIMEDOUT", "ERR_NETWORK"].includes(err.code || "") && !err.response) {
          console.warn("🚫 Falha de rede ou CORS bloqueado.");  
          
          return Promise.reject({
            status: 500,
            errors: [{
              level: 'critical',
              message: 'Server offline'
            }],
            timestamp: new Date().toISOString(),
            path: '/'
          });
        }

        const error: ApiError = err.response.data;

        return Promise.reject(error);
      }
    );
  }
}