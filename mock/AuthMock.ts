import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../Interface/AuthInterface";

export const mockRegister = async (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    message: "Usuario registrado correctamente",
    token: "mock-jwt-token-register-123",
    user: {
      id: crypto.randomUUID(),
      fullName: payload.fullName,
      email: payload.email,
      role: "student",
      avatar: null,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
};

export const mockLogin = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    message: "Inicio de sesión exitoso",
    token: "mock-jwt-token-login-456",
    user: {
      id: crypto.randomUUID(),
      fullName: "Demo User",
      email: payload.email,
      role: "student",
      avatar: null,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
};
