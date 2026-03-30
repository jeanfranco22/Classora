"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import {
  AuthContextType,
  LoginPayload,
  RegisterPayload,
} from "../../Interface/AuthInterface";
import { DataUser } from "../../Interface/UserInterface";
import { loginUser, registerUser } from "../services/AuthServices";

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

  const saveSession = (token: string, user: DataUser["user"]) => {
    const session: DataUser = {
      user,
      token,
      isAuthenticated: true,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setDataUser(session);
  };

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

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setDataUser(initialDataUser);
  };

  const value = useMemo<AuthContextType>(
    () => ({
      dataUser,
      register,
      login,
      logout,
      loading,
    }),
    [dataUser, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
