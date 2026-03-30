export type UserRole = "student" | "teacher" | "admin";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatar?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DataUser {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
