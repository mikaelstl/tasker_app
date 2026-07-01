export interface ApiResponse<T> {
  readonly status: number;
  
  readonly message: string | string[];
  
  readonly data: T;
  
  readonly path: string;
  
  readonly error: boolean;

  readonly timestamp: string;
}