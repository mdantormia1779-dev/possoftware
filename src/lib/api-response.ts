import { NextResponse } from "next/server";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: any;
}

export function apiSuccess<T>(data: T, message?: string, status: number = 200) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      data,
      ...(message ? { message } : {}),
    },
    { status }
  );
}

export function apiError(
  error: string,
  status: number = 400,
  details?: any
) {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      error,
      ...(details ? { details } : {}),
    },
    { status }
  );
}
