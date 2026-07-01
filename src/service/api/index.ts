import axios, { type AxiosInstance, type AxiosResponse } from "axios"
import type { ApiError } from "../types/response/error";
import type { ApiResponse } from "../types/response/response";

export class ApiClient {
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

  async register<P, R>(params: { route: string, data?: P }): Promise<ApiResponse<R>> {
    const response: AxiosResponse<ApiResponse<R>> = await this.api.post(params.route, params.data);

    return response.data;
  }

  async load<R, Q>({ route, params, headers}: { route: string, params?: Q, headers?: any }): Promise<ApiResponse<R>> {
    const response: AxiosResponse<ApiResponse<R>> = await this.api.get(route, {
      headers: headers,
      params: params
    });

    return response.data;
  }

  async remove<R>(params: { route: string }): Promise<ApiResponse<R>> {
    const response: AxiosResponse<ApiResponse<R>> = await this.api.delete(params.route);

    return response.data;
  }

  async change<P, R>(params: { route: string, data?: P }): Promise<ApiResponse<R>> {
    const response: AxiosResponse<ApiResponse<R>> = await this.api.patch(params.route, params.data);

    return response.data;
  }

  async update<P, R>(params: { route: string, data?: P }): Promise<ApiResponse<R>> {
    const response: AxiosResponse<ApiResponse<R>> = await this.api.put(params.route, params.data);

    return response.data;
  }

  private config() {
    // APPLYNG TOKEN INTO REQUEST
    this.api.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('tasker.api.token');
        const xOrgKey = localStorage.getItem('tasker.api.org');
        config.headers ??= {};
      
        if (token) config.headers['Authorization'] = `Bearer ${token}`;
        if (xOrgKey) config.headers['X-Org-Key'] = xOrgKey;

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

        if ((err.response?.status ?? err.status) === 401) {
          return Promise.reject({
            status: 401,
            errors: [{
              level: 'error',
              message: err.response.data.message
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
        
        if ((err.response?.status ?? err.status) === 401) {
          console.log("ERRO 401");
          
          localStorage.removeItem("tasker.api.token");
          window.location.href = "/login";

          return Promise.reject({
            status: 401,
            errors: [{
              level: 'error',
              message: err.response.data.message
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
