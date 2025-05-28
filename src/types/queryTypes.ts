export interface UseApiQueryProps<TData> {
  queryKey: string[];
  url: string;
  enabled?: boolean;
  config?: {
    params?: Record<string, any>;
    headers?: Record<string, string>;
    [key: string]: any;
  };
}
