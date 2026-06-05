import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../../Interface/AuthInterface";
import { BackendUser, User, UserRole } from "../../Interface/UserInterface";
import { apiClient } from "./apiClient";

interface BackendAuthResponse {
  accessToken: string;
  user: BackendUser;
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

function mapAuthResponse(response: BackendAuthResponse): AuthResponse {
  return {
    success: true,
    message: "Autenticación exitosa",
    token: response.accessToken,
    user: mapBackendUser(response.user),
  };
}

export async function registerUser(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const registerPayload = {
    fullName: payload.fullName,
    name: payload.fullName,
    email: payload.email,
    password: payload.password,
    confirmPassword: payload.confirmPassword,
  };

  if (process.env.NODE_ENV !== "production") {
    console.log("Register payload check:", {
      keys: Object.keys(registerPayload),
      hasPassword: Boolean(registerPayload.password),
      hasConfirmPassword: Boolean(registerPayload.confirmPassword),
      passwordsMatch:
        registerPayload.password === registerPayload.confirmPassword,
    });
  }

  const response = await apiClient<BackendAuthResponse>("/auth/register", {
    method: "POST",
    body: registerPayload,
  });

  return mapAuthResponse(response);
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await apiClient<BackendAuthResponse>("/auth/login", {
    method: "POST",
    body: payload,
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
