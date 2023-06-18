export interface ApiErrorResponse {
  status: number;
  data: { message: string; details: string };
}

export function isApiResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === 'object' &&
    error != null &&
    'status' in error &&
    typeof error.status === 'number'
  );
}
