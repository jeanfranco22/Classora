const RAILWAY_API_URL = "https://classora-server-production.up.railway.app";

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

function getApiBaseUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new ApiError(
      `NEXT_PUBLIC_API_URL no está configurada. Define NEXT_PUBLIC_API_URL=${RAILWAY_API_URL} en .env.local y en Vercel.`,
      0,
    );
  }

  return apiUrl.replace(/\/$/, "");
}

function getApiUrl(path: string) {
  return `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

async function parseResponse(response: Response) {
  if (response.status === 204) return null;

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
  const hasBody = body !== undefined;

  const response = await fetch(getApiUrl(path), {
    ...requestOptions,
    headers: {
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: hasBody ? JSON.stringify(body) : undefined,
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
