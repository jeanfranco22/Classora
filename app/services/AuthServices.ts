import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../../Interface/AuthInterface";
import { mockLogin, mockRegister } from "../../mock/AuthMock";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  /**
   * Backend real:
   *
   * const response = await fetch(`${API_URL}/auth/register`, {
   *   method: "POST",
   *   headers: {
   *     "Content-Type": "application/json",
   *   },
   *   body: JSON.stringify(payload),
   * });
   *
   * if (!response.ok) {
   *   throw new Error("Error al registrar usuario");
   * }
   *
   * return response.json();
   */

  return mockRegister(payload);
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  /**
   * Backend real:
   *
   * const response = await fetch(`${API_URL}/auth/login`, {
   *   method: "POST",
   *   headers: {
   *     "Content-Type": "application/json",
   *   },
   *   body: JSON.stringify(payload),
   * });
   *
   * if (!response.ok) {
   *   throw new Error("Error al iniciar sesión");
   * }
   *
   * return response.json();
   */

  return mockLogin(payload);
}
