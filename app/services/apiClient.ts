const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: unknown;
  token?: string | null;
  headers?: HeadersInit;
};

function getApiUrl(path: string) {
  if (!API_URL) {
    throw new ApiError(
      "NEXT_PUBLIC_API_URL is not configured",
      0,
    );
  }

  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return response.text();
  }

  return response.json();
}

function getErrorMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object" && "message" in payload) {
    const message = (payload as { message: unknown }).message;

    if (Array.isArray(message)) return message.join(". ");
    if (typeof message === "string") return message;
  }

  return fallback;
}

export async function apiClient<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { body, token, headers, ...requestOptions } = options;

  const response = await fetch(getApiUrl(path), {
    ...requestOptions,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(
      getErrorMessage(payload, `API error ${response.status}`),
      response.status,
      payload,
    );
  }

  return payload as T;
}
