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
  isProfileComplete?: boolean;
}

export interface BackendUser {
  id: string;
  name?: string;
  fullName?: string;
  email: string;
  role: string;
  profileImg?: string | null;
  avatar?: string | null;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  isProfileComplete?: boolean;
}

export interface DataUser {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
