import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../../Interface/AuthInterface";
import { BackendUser, User, UserRole } from "../../Interface/UserInterface";
import { ApiError, apiClient } from "./apiClient";

interface BackendAuthResponse {
  accessToken?: string;
  access_token?: string;
  token?: string;
  message?: string;
  user?: BackendUser;
}

function mapRole(role: string): UserRole {
  const normalized = role.toLowerCase();

  if (["student", "teacher", "admin"].includes(normalized)) {
    return normalized as UserRole;
  }

  return "student";
}

export function mapBackendUser(user: BackendUser): User {
  const now = new Date().toISOString();

  return {
    id: user.id,
    fullName: user.fullName || user.name || user.email,
    email: user.email,
    role: mapRole(user.role),
    avatar: user.avatar ?? user.profileImg ?? null,
    isActive: user.isActive ?? true,
    createdAt: user.createdAt ?? now,
    updatedAt: user.updatedAt ?? now,
    isProfileComplete: user.isProfileComplete,
  };
}

function getAuthToken(response: BackendAuthResponse) {
  return response.accessToken || response.access_token || response.token || "";
}

function mapAuthResponse(response: BackendAuthResponse): AuthResponse {
  const token = getAuthToken(response);

  if (!token) {
    throw new ApiError(
      "El backend no devolvió un token de autenticación.",
      0,
      response,
    );
  }

  return {
    success: true,
    message: response.message || "Autenticación exitosa",
    token,
    user: response.user ? mapBackendUser(response.user) : null,
  };
}

export async function registerUser(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const response = await apiClient<BackendAuthResponse>("/auth/register", {
    method: "POST",
    body: {
      name: payload.fullName.trim(),
      email: payload.email.trim(),
      password: payload.password,
    },
  });

  return mapAuthResponse(response);
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await apiClient<BackendAuthResponse>("/auth/login", {
    method: "POST",
    body: {
      email: payload.email.trim(),
      password: payload.password,
    },
  });

  return mapAuthResponse(response);
}

export async function getCurrentUser(token: string): Promise<User> {
  const response = await apiClient<BackendUser>("/auth/me", {
    method: "GET",
    token,
  });

  return mapBackendUser(response);
}
