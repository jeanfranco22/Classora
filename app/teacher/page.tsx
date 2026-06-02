"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BackendTeacherReservation } from "../../Interface/BookingInterface";
import { useAuth } from "../../hooks/useAuth";
import { getTeacherReservations } from "../services/BookingServices";

function formatDate(date?: string) {
  if (!date) return "Fecha no disponible";

  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
}

function getReservationDate(reservation: BackendTeacherReservation) {
  return reservation.class_schedule?.date || reservation.date;
}

export default function TeacherDashboardPage() {
  const { dataUser } = useAuth();
  const [reservations, setReservations] = useState<BackendTeacherReservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = dataUser.token;
  const user = dataUser.user;
  const isTeacher = user?.role === "teacher" || user?.role === "admin";

  useEffect(() => {
    const loadReservations = async () => {
      if (!token || !isTeacher) {
        setReservations([]);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getTeacherReservations(token);
        setReservations(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las reservas de la profesora.");
      } finally {
        setLoading(false);
      }
    };

    void loadReservations();
  }, [isTeacher, token]);

  return (
    <section className="min-h-screen bg-[#fffaf5] px-6 py-16 text-[#1d1d1d]">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-3">
          <span className="inline-flex rounded-full border border-[#e7d8c9] bg-white px-4 py-2 text-sm font-medium text-[#8b5e3c]">
            Panel docente
          </span>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Próximas reservas
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[#6b625b] md:text-lg">
            Consulta las clases reservadas por alumnos para preparar la semana de beta privada.
          </p>
        </div>

        {!dataUser.isAuthenticated ? (
          <div className="rounded-[28px] border border-[#eadfd3] bg-white p-6 shadow-sm">
            <p className="text-sm text-[#6b625b]">Inicia sesión como profesora para ver tus reservas.</p>
            <Link href="/login" className="mt-4 inline-flex rounded-full bg-[#8b5e3c] px-5 py-3 text-sm font-medium text-white">
              Iniciar sesión
            </Link>
          </div>
        ) : !isTeacher ? (
          <div className="rounded-[28px] border border-[#eadfd3] bg-white p-6 text-sm text-[#6b625b] shadow-sm">
            Esta vista está disponible para profesoras y administradores.
          </div>
        ) : loading ? (
          <div className="rounded-[28px] border border-[#eadfd3] bg-white p-6 text-sm text-[#6b625b] shadow-sm">
            Cargando reservas...
          </div>
        ) : error ? (
          <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-sm text-red-600 shadow-sm">
            {error}
          </div>
        ) : reservations.length === 0 ? (
          <div className="rounded-[28px] border border-[#eadfd3] bg-white p-6 text-sm text-[#6b625b] shadow-sm">
            No hay reservas confirmadas para tus clases.
          </div>
        ) : (
          <div className="overflow-hidden rounded-[28px] border border-[#eadfd3] bg-white shadow-sm">
            <div className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_1fr_1fr_0.8fr]">
              <div className="hidden border-b border-[#eadfd3] bg-[#fffdfb] px-5 py-4 text-sm font-semibold md:block">Clase</div>
              <div className="hidden border-b border-[#eadfd3] bg-[#fffdfb] px-5 py-4 text-sm font-semibold md:block">Alumno</div>
              <div className="hidden border-b border-[#eadfd3] bg-[#fffdfb] px-5 py-4 text-sm font-semibold md:block">Fecha y hora</div>
              <div className="hidden border-b border-[#eadfd3] bg-[#fffdfb] px-5 py-4 text-sm font-semibold md:block">Estado</div>

              {reservations.map((reservation) => (
                <div key={reservation.id} className="contents">
                  <div className="border-b border-[#eadfd3] px-5 py-4">
                    <p className="text-xs font-semibold uppercase text-[#8b5e3c] md:hidden">Clase</p>
                    <p className="font-medium">{reservation.class_schedule?.class?.name || "Clase de español"}</p>
                  </div>
                  <div className="border-b border-[#eadfd3] px-5 py-4">
                    <p className="text-xs font-semibold uppercase text-[#8b5e3c] md:hidden">Alumno</p>
                    <p className="font-medium">{reservation.users?.name || "Alumno"}</p>
                    <p className="text-sm text-[#6b625b]">{reservation.users?.email || "Email no disponible"}</p>
                  </div>
                  <div className="border-b border-[#eadfd3] px-5 py-4">
                    <p className="text-xs font-semibold uppercase text-[#8b5e3c] md:hidden">Fecha y hora</p>
                    <p>{formatDate(getReservationDate(reservation))}</p>
                    <p className="text-sm text-[#6b625b]">{reservation.class_schedule?.time || "Horario no disponible"}</p>
                  </div>
                  <div className="border-b border-[#eadfd3] px-5 py-4">
                    <p className="text-xs font-semibold uppercase text-[#8b5e3c] md:hidden">Estado</p>
                    <span className="inline-flex rounded-full border border-[#dfd2c6] bg-[#fffdfb] px-3 py-1 text-sm font-medium text-[#8b5e3c]">
                      {reservation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
