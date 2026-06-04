import { User } from "./UserInterface";

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User | null;
}

export interface AuthContextType {
  dataUser: {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
  };
  register: (payload: RegisterPayload) => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  getCurrentUser: () => Promise<User | null>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}
