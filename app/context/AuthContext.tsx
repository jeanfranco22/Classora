"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
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
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveSession = useCallback((token: string, user: User | null) => {
    const session: DataUser = {
      user,
      token,
      isAuthenticated: Boolean(token),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setDataUser(session);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setDataUser(initialDataUser);
    setError(null);
  }, []);

  const getCurrentUser = useCallback(
    async (sessionToken = dataUser.token) => {
      if (!sessionToken) return null;

      const user = await fetchCurrentUser(sessionToken);
      saveSession(sessionToken, user);
      return user;
    },
    [dataUser.token, saveSession],
  );

  useEffect(() => {
    const storedSession = localStorage.getItem(STORAGE_KEY);

    if (!storedSession) {
      setInitializing(false);
      return;
    }

    let cancelled = false;

    const hydrateSession = async () => {
      try {
        const parsedSession: DataUser = JSON.parse(storedSession);

        if (parsedSession?.token) {
          setDataUser({
            user: parsedSession.user ?? null,
            token: parsedSession.token,
            isAuthenticated: true,
          });

          setLoading(true);
          const user = await fetchCurrentUser(parsedSession.token);

          if (!cancelled) saveSession(parsedSession.token, user);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        console.error("Error reading auth session:", error);
        if (!cancelled) logout();
      } finally {
        if (!cancelled) {
          setLoading(false);
          setInitializing(false);
        }
      }
    };

    void hydrateSession();
    return () => {
      cancelled = true;
    };
  }, [logout, saveSession]);

  const register = useCallback(async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await registerUser(payload);
      const user = response.user ?? (await fetchCurrentUser(response.token));
      saveSession(response.token, user);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No se pudo completar el registro.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [saveSession]);

  const login = useCallback(async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(payload);
      const user = response.user ?? (await fetchCurrentUser(response.token));
      saveSession(response.token, user);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No se pudo iniciar sesión.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [saveSession]);

  const value = useMemo<AuthContextType>(
    () => ({
      dataUser,
      register,
      login,
      getCurrentUser,
      logout,
      initializing,
      loading,
      error,
    }),
    [
      dataUser,
      error,
      getCurrentUser,
      initializing,
      loading,
      login,
      logout,
      register,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
