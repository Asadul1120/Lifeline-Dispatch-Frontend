export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: PaginatedMeta;
}

export interface ApiErrorBody {
  success: false;
  message: string;
  errors?: Array<{ path: string; message: string }>;
  statusCode?: number;
}

export type MessageSource = {
  message?: unknown;
  data?: {
    message?: unknown;
  } | null;
  response?: {
    data?: {
      message?: unknown;
    } | null;
  } | null;
};
