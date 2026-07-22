interface DotEnvI {
  readonly API_BASE_URL: string;
  readonly APP_NAME: string;
  readonly REQUEST_TIMEOUT: number;
  readonly USE_MOCKS: boolean;
  readonly API_TOKEN: string;
}

const dotenv: DotEnvI = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME,
  REQUEST_TIMEOUT: import.meta.env.VITE_REQUEST_TIMEOUT,
  USE_MOCKS: import.meta.env.VITE_USE_MOCKS === "true",
  API_TOKEN: import.meta.env.VITE_API_TOKEN 
}

export default dotenv;