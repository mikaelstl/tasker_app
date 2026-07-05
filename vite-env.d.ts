/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_BASE_URL: string;
  readonly APP_NAME: string;
  readonly REQUEST_TIMEOUT: number;
  readonly USE_MOCKS: boolean;
  readonly API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}