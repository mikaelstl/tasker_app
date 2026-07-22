export type ErrorLevel = 'info' | 'warning' | 'error' | 'critical' | 'validation';

export interface ApiErrorItem {
  readonly level: ErrorLevel;
  readonly message: string;
  readonly details?: string;
  readonly error?: string;
}


export interface ApiError {
  readonly status: number,
  readonly errors: ApiErrorItem[],
  readonly timestamp: string,
  readonly path: string
}
