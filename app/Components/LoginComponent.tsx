"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginPayload } from "../../Interface/AuthInterface";
import { useAuth } from "../../hooks/useAuth";

const initialForm: LoginPayload = {
  email: "",
  password: "",
};

export function LoginComponent() {
  const router = useRouter();
  const { login, loading } = useAuth();

  const [form, setForm] = useState<LoginPayload>(initialForm);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!form.email.trim()) return "El correo es obligatorio.";
    if (!form.password.trim()) return "La contraseña es obligatoria.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await login(form);
      router.push("/booking");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "No se pudo iniciar sesión.",
      );
    }
  };

  return (
    <section className="min-h-screen bg-[#fffaf5] px-6 py-16 text-[#1d1d1d]">
      <div className="mx-auto max-w-2xl rounded-[32px] border border-[#eadfd3] bg-white p-6 shadow-lg md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Iniciar sesión</h1>
          <p className="mt-2 text-sm leading-7 text-[#6b625b]">
            Accede a tu cuenta para gestionar tus clases.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className="w-full rounded-2xl border border-[#dfd2c6] bg-[#fffdfb] px-4 py-3 outline-none transition focus:border-[#b5855b]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-[#dfd2c6] bg-[#fffdfb] px-4 py-3 outline-none transition focus:border-[#b5855b]"
            />
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#8b5e3c] px-5 py-4 font-medium text-white transition hover:bg-[#744b2d] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>

          <p className="text-center text-sm text-[#6b625b]">
            ¿No tienes cuenta?{" "}
            <Link
              href="/register"
              className="font-medium text-[#8b5e3c] underline-offset-4 hover:underline"
            >
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
