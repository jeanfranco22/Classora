"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import {
  AuthContextType,
  LoginPayload,
  RegisterPayload,
} from "../../Interface/AuthInterface";
import { DataUser, User } from "../../Interface/UserInterface";
import {
  getCurrentUser as fetchCurrentUser,
  loginUser,
  registerUser,
} from "../services/AuthServices";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const initialDataUser: DataUser = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const STORAGE_KEY = "auth_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [dataUser, setDataUser] = useState<DataUser>(initialDataUser);
  const [loading, setLoading] = useState(false);

  const saveSession = (token: string, user: User | null) => {
    const session: DataUser = {
      user,
      token,
      isAuthenticated: Boolean(token && user),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setDataUser(session);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setDataUser(initialDataUser);
  };

  const getCurrentUser = async () => {
    if (!dataUser.token) return null;

    const user = await fetchCurrentUser(dataUser.token);
    saveSession(dataUser.token, user);
    return user;
  };

  useEffect(() => {
    const storedSession = localStorage.getItem(STORAGE_KEY);

    if (!storedSession) return;

    try {
      const parsedSession: DataUser = JSON.parse(storedSession);

      if (parsedSession?.token && parsedSession?.user) {
        setDataUser({
          user: parsedSession.user,
          token: parsedSession.token,
          isAuthenticated: true,
        });
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error reading auth session:", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const register = async (payload: RegisterPayload) => {
    setLoading(true);

    try {
      const response = await registerUser(payload);
      saveSession(response.token, response.user);
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload: LoginPayload) => {
    setLoading(true);

    try {
      const response = await loginUser(payload);
      saveSession(response.token, response.user);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo<AuthContextType>(
    () => ({
      dataUser,
      register,
      login,
      getCurrentUser,
      logout,
      loading,
    }),
    [dataUser, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
