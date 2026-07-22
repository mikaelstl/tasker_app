import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import type { ApiError } from "../types/response/error";
import type { ApiResponse } from "../types/response/response";
import { STORAGE_KEYS, clearSessionStorage } from "@/config/storage";

export class ApiClient {
  private api: AxiosInstance;

  private get path(): string { return "http://localhost:3000"}

  constructor() {
    this.api = axios.create({
      baseURL: this.path,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.config();
  }

  async register<P, R>(params: { route: string, data?: P }): Promise<ApiResponse<R>> {
    const response: ApiResponse<R> = await this.api.post(params.route, params.data);

    return response;
  }

  async load<R, Q>({
    route,
    params,
    headers,
  }: {
    route: string;
    params?: Q;
    headers?: AxiosRequestConfig["headers"];
  }): Promise<ApiResponse<R>> {
    const response: ApiResponse<R> = await this.api.get(route, {
      headers: headers,
      params: params
    });

    return response;
  }

  async remove<R>(params: { route: string }): Promise<ApiResponse<R>> {
    const response: ApiResponse<R> = await this.api.delete(params.route);

    return response;
  }

  async change<P, R>(params: { route: string, data?: P }): Promise<ApiResponse<R>> {
    const response: ApiResponse<R> = await this.api.patch(params.route, params.data);

    return response;
  }

  async update<P, R>(params: { route: string, data?: P }): Promise<ApiResponse<R>> {
    const response: ApiResponse<R> = await this.api.put(params.route, params.data);

    return response;
  }

  async download<P>({
    route,
    data,
    fallbackFilename,
  }: {
    route: string;
    data?: P;
    fallbackFilename: string;
  }): Promise<void> {
    const response = await this.api.post<
      Blob,
      AxiosResponse<Blob>,
      P | undefined
    >(route, data, {
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
      },
    });
    const filename = this.downloadFilename(
      response.headers["content-disposition"],
      fallbackFilename,
    );
    const url = URL.createObjectURL(response.data);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = filename;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  private config() {
    // APPLYNG TOKEN INTO REQUEST
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.auth.token);
        const xOrgKey = localStorage.getItem(STORAGE_KEYS.organization.orgkey);
      
        if (token) config.headers['Authorization'] = `Bearer ${token}`;
        if (xOrgKey) config.headers['X-Org-Key'] = xOrgKey;

        return config;
      },
      (error: unknown) => this.rejectApiError(error, false),
    );

    this.api.interceptors.response.use(
      (response) => (
        response.config.responseType === "blob"
          ? response
          : response.data
      ) as AxiosResponse,
      (error: unknown) => this.rejectApiError(error, true),
    );
  }

  private rejectApiError(error: unknown, redirectOnUnauthorized: boolean): Promise<never> {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    if (
      ["ECONNREFUSED", "ENOTFOUND", "ETIMEDOUT", "ERR_NETWORK"].includes(error.code ?? "")
      && !error.response
    ) {
      console.warn("🚫 Falha de rede ou CORS bloqueado.");

      return Promise.reject({
        status: 500,
        errors: [{
          level: "critical",
          message: "Servidor indisponível",
        }],
        timestamp: new Date().toISOString(),
        path: "/",
      } satisfies ApiError);
    }

    if (error.response?.status === 401) {
      if (redirectOnUnauthorized) {
        clearSessionStorage();
        window.location.replace("/login");
      }

      return Promise.reject({
        status: 401,
        errors: [{
          level: "error",
          message: this.responseMessage(error.response.data),
        }],
        timestamp: new Date().toISOString(),
        path: "/",
      } satisfies ApiError);
    }

    return Promise.reject(error.response?.data ?? error);
  }

  private responseMessage(data: unknown): string {
    if (
      typeof data === "object"
      && data !== null
      && "errors" in data
      && Array.isArray(data.errors)
    ) {
      const firstError = data.errors[0];

      if (
        typeof firstError === "object"
        && firstError !== null
        && "message" in firstError
        && typeof firstError.message === "string"
      ) {
        return firstError.message;
      }
    }

    if (
      typeof data === "object"
      && data !== null
      && "message" in data
      && typeof data.message === "string"
    ) {
      return data.message;
    }

    return "Não autorizado.";
  }

  private downloadFilename(
    contentDisposition: string | undefined,
    fallback: string,
  ): string {
    if (!contentDisposition) {
      return fallback;
    }

    const encoded = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i)?.[1];

    if (encoded) {
      try {
        return decodeURIComponent(encoded.replace(/^["']|["']$/g, ""));
      } catch {
        return fallback;
      }
    }

    return contentDisposition
      .match(/filename\s*=\s*"([^"]+)"|filename\s*=\s*([^;]+)/i)
      ?.slice(1)
      .find(Boolean)
      ?.trim() ?? fallback;
  }
}
