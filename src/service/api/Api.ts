import axios, { type AxiosInstance } from "axios"
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

  async post<T>(params: { route: string, data: T }): Promise<any> {
    const response = this.api.post(params.route, params.data);
    
    return response;
  }

  async get<Q>({ route, params, headers}: { route: string, params?: Q, headers?: any }): Promise<any> {
    const response = this.api.get(route, {
      headers: headers,
      params: params
    });
    
    return response;
  }

  private config() {
    // APPLYNG TOKEN INTO REQUEST
    this.api.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('tasker.api.token');
        const xOrgKey = localStorage.getItem('tasker.api.orgkey');
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
