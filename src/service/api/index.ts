import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import type { ApiError } from "@/service/types/response/error";
import type { ApiResponse } from "@/service/types/response/response";
import { STORAGE_KEYS, expireAuthSession } from "@/config/storage";
import dotenv from "@/config/dotenv";
import { notifications, type ToastLevel } from "@/hooks/useToast";

const TOAST_LEVELS: ToastLevel[] = [
  "info",
  "warning",
  "error",
  "critical",
  "validation",
];

export class ApiClient {
  private api: AxiosInstance;

  constructor() {
    const configuredTimeout = Number(dotenv.REQUEST_TIMEOUT);

    this.api = axios.create({
      baseURL: dotenv.API_BASE_URL || "http://localhost:3000",
      timeout: Number.isFinite(configuredTimeout) && configuredTimeout > 0
        ? configuredTimeout
        : 10_000,
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
        const request = this.requestIdentity(config.url, config.method);

        if (token && !request.isPublic) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        if (xOrgKey && !request.omitsOrganization) {
          config.headers["x-org-key"] = xOrgKey;
        }

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

  private rejectApiError(error: unknown, expireSessionOnUnauthorized: boolean): Promise<never> {
    if (!axios.isAxiosError(error)) {
      const apiError = this.normalizeApiError(error, 500, "/");
      this.notifyError(apiError);

      return Promise.reject(apiError);
    }

    if (
      ["ECONNABORTED", "ECONNREFUSED", "ENOTFOUND", "ETIMEDOUT", "ERR_NETWORK"].includes(error.code ?? "")
      && !error.response
    ) {
      console.warn("🚫 Falha de rede ou CORS bloqueado.");

      const apiError = {
        status: 500,
        errors: [{
          level: "critical",
          message: "Servidor indisponível",
        }],
        timestamp: new Date().toISOString(),
        path: "/",
      } satisfies ApiError;

      this.notifyError(apiError);
      return Promise.reject(apiError);
    }

    const request = this.requestIdentity(error.config?.url, error.config?.method);
    const apiError = this.normalizeApiError(
      error.response?.data,
      error.response?.status ?? 500,
      error.config?.url ?? "/",
    );

    this.notifyError(apiError);

    if (error.response?.status === 401) {
      if (expireSessionOnUnauthorized && !request.handlesUnauthorizedLocally) {
        expireAuthSession();
      }
    }

    return Promise.reject(apiError);
  }

  private notifyError(error: ApiError): void {
    if (!error.errors?.length) {
      notifications.error("Não foi possível concluir a solicitação.");
      return;
    }

    error.errors.forEach((item) => {
      const level = TOAST_LEVELS.includes(item.level) ? item.level : "error";
      notifications[level](item.message || "Não foi possível concluir a solicitação.");
    });
  }

  private normalizeApiError(data: unknown, status: number, path: string): ApiError {
    if (
      typeof data === "object"
      && data !== null
      && "errors" in data
      && Array.isArray(data.errors)
    ) {
      return data as unknown as ApiError;
    }

    return {
      status,
      errors: [{
        level: status >= 500 ? "critical" : status === 422 || status === 400 ? "validation" : "error",
        message: this.responseMessage(data),
      }],
      timestamp: new Date().toISOString(),
      path,
    };
  }

  private requestIdentity(url = "", method = "get") {
    const path = url.split("?")[0].replace(/\/$/, "");
    const verb = method.toLowerCase();
    const isPublic = (verb === "get" && (path === "/status" || path === "/auth"))
      || (verb === "post" && (path === "/auth/login" || path === "/accounts/register"));
    const omitsOrganization = isPublic
      || path === "/auth/validate"
      || (verb === "post" && path === "/org");

    return {
      isPublic,
      omitsOrganization,
      handlesUnauthorizedLocally: path === "/auth/login",
    };
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

    return "Não foi possível concluir a solicitação.";
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
