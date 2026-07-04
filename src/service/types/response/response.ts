export interface ApiResponse<T> {
  readonly status: number;
  
  readonly message: string;
  
  readonly data: T;
  
  readonly path: string;
  
  readonly error: boolean;

  readonly timestamp: string;
}