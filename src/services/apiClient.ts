export interface RequestOptions extends RequestInit {
  orgId?: string;
  branchId?: string;
  userId?: string;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<{ success: boolean; data?: T; error?: string; message?: string }> {
  const { orgId, branchId, userId, headers = {}, ...rest } = options;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (orgId) defaultHeaders["x-organization-id"] = orgId;
  if (branchId) defaultHeaders["x-branch-id"] = branchId;
  if (userId) defaultHeaders["x-user-id"] = userId;

  try {
    const res = await fetch(endpoint, {
      headers: { ...defaultHeaders, ...(headers as Record<string, string>) },
      ...rest,
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Network error occurred",
    };
  }
}
