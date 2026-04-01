"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterPayload } from "../../Interface/AuthInterface";
import { useAuth } from "../../hooks/useAuth";

const initialForm: RegisterPayload = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function RegisterComponent() {
  const router = useRouter();
  const { register, loading } = useAuth();

  const [form, setForm] = useState<RegisterPayload>(initialForm);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!form.fullName.trim()) return "El nombre es obligatorio.";
    if (!form.email.trim()) return "El correo es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Ingresa un correo válido.";
    if (!form.password.trim()) return "La contraseña es obligatoria.";
    if (form.password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }
    if (form.password !== form.confirmPassword) {
      return "Las contraseñas no coinciden.";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await register(form);
      setSuccessMessage("Registro exitoso. Redirigiendo...");
      setForm(initialForm);

      setTimeout(() => {
        router.push("/booking");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("No se pudo completar el registro.");
    }
  };

  return (
    <section className="min-h-screen bg-[#fffaf5] px-6 py-16 text-[#1d1d1d]">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.95fr]">
        <div className="flex flex-col justify-center space-y-6">
          <span className="inline-flex w-fit rounded-full border border-[#e7d8c9] bg-white px-4 py-2 text-sm font-medium text-[#8b5e3c]">
            Crea tu cuenta
          </span>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Empieza tu experiencia de aprendizaje de español
            </h1>

            <p className="max-w-2xl text-base leading-8 text-[#6b625b] md:text-lg">
              Regístrate para reservar clases, administrar tus sesiones y llevar
              un seguimiento de tu progreso en un solo lugar.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-[#eadfd3] bg-white p-5 shadow-sm">
              <p className="text-sm text-[#8b5e3c]">Acceso rápido</p>
              <p className="mt-2 text-lg font-semibold">Panel personal</p>
            </div>

            <div className="rounded-3xl border border-[#eadfd3] bg-white p-5 shadow-sm">
              <p className="text-sm text-[#8b5e3c]">Tus clases</p>
              <p className="mt-2 text-lg font-semibold">Historial y reservas</p>
            </div>

            <div className="rounded-3xl border border-[#eadfd3] bg-white p-5 shadow-sm">
              <p className="text-sm text-[#8b5e3c]">Seguridad</p>
              <p className="mt-2 text-lg font-semibold">Pago seguro </p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#eadfd3] bg-white p-6 shadow-lg md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Registro</h2>
            <p className="mt-2 text-sm leading-7 text-[#6b625b]">
              Completa tus datos para crear tu cuenta.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                Nombre completo
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                className="w-full rounded-2xl border border-[#dfd2c6] bg-[#fffdfb] px-4 py-3 outline-none transition focus:border-[#b5855b]"
              />
            </div>

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

            <div className="grid gap-5 md:grid-cols-2">
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

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirmar contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-[#dfd2c6] bg-[#fffdfb] px-4 py-3 outline-none transition focus:border-[#b5855b]"
                />
              </div>
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            ) : null}

            {successMessage ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {successMessage}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#8b5e3c] px-5 py-4 font-medium text-white transition hover:bg-[#744b2d] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>

            <p className="text-center text-sm text-[#6b625b]">
              ¿Ya tienes cuenta?{" "}
              <Link
                href="/login"
                className="font-medium text-[#8b5e3c] underline-offset-4 hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
