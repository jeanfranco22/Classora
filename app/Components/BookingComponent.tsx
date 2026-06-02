"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BackendReservation,
  BookingFormData,
  LessonLevel,
  LessonType,
  TimeSlot,
} from "../../Interface/BookingInterface";
import { useAuth } from "../../hooks/useAuth";
import {
  createReservation,
  getAvailableSlots,
  getMyReservations,
} from "../services/BookingServices";

const lessonTypes: LessonType[] = [
  "Conversación",
  "Gramática",
  "Preparación para entrevistas",
  "Español para viajar",
  "Español de negocios",
];

const lessonLevels: LessonLevel[] = ["Principiante", "Intermedio", "Avanzado"];

const durations = [30, 45, 60];

const initialForm: BookingFormData = {
  studentName: "",
  studentEmail: "",
  date: "",
  lessonType: "Conversación",
  level: "Principiante",
  duration: 60,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
  notes: "",
};

function formatDate(date?: string) {
  if (!date) return "Fecha no disponible";

  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
}

function getReservationClassName(reservation: BackendReservation) {
  return reservation.class_schedule?.class?.name || "Clase de español";
}

function getReservationDate(reservation: BackendReservation) {
  return reservation.class_schedule?.date || reservation.date;
}

export function BookingComponent() {
  const { dataUser } = useAuth();
  const [form, setForm] = useState<BookingFormData>(initialForm);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [reservations, setReservations] = useState<BackendReservation[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [reservationsError, setReservationsError] = useState<string>("");

  const token = dataUser.token;
  const user = dataUser.user;
  const isAuthenticated = dataUser.isAuthenticated && Boolean(token);

  const canFetchSlots = useMemo(() => {
    return Boolean(isAuthenticated && form.date && form.duration && form.timezone);
  }, [form.date, form.duration, form.timezone, isAuthenticated]);

  const loadReservations = async () => {
    if (!token) {
      setReservations([]);
      return;
    }

    try {
      setLoadingReservations(true);
      setReservationsError("");

      const data = await getMyReservations(token);
      setReservations(data);
    } catch (err) {
      console.error(err);
      setReservationsError("No se pudieron cargar tus reservaciones.");
    } finally {
      setLoadingReservations(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    setForm((prev) => ({
      ...prev,
      studentName: prev.studentName || user.fullName,
      studentEmail: prev.studentEmail || user.email,
    }));
  }, [user]);

  useEffect(() => {
    void loadReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const loadSlots = async () => {
      if (!isAuthenticated) {
        setSlots([]);
        setSelectedSlot("");
        setError("Inicia sesión para ver horarios disponibles.");
        return;
      }

      if (!canFetchSlots || !token) {
        setSlots([]);
        setSelectedSlot("");
        return;
      }

      try {
        setLoadingSlots(true);
        setError("");
        setMessage("");

        const data = await getAvailableSlots(
          {
            date: form.date,
            duration: form.duration,
            timezone: form.timezone,
          },
          token,
        );

        setSlots(data);
        setSelectedSlot("");

        if (!data.length) {
          setError("No hay horarios disponibles para esa fecha y duración.");
        }
      } catch (err) {
        console.error(err);
        setSlots([]);
        setError("No se pudieron cargar los horarios disponibles.");
      } finally {
        setLoadingSlots(false);
      }
    };

    loadSlots();
  }, [canFetchSlots, form.date, form.duration, form.timezone, isAuthenticated, token]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
  };

  const validateForm = () => {
    if (!isAuthenticated || !token) return "Inicia sesión para reservar una clase.";
    if (!form.studentName.trim()) return "El nombre es obligatorio.";
    if (!form.studentEmail.trim()) return "El correo es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(form.studentEmail)) {
      return "Ingresa un correo válido.";
    }
    if (!form.date) return "Selecciona una fecha.";
    if (!selectedSlot) return "Selecciona un horario disponible.";

    const slot = slots.find((item) => item.id === selectedSlot);
    if (!slot || !slot.available) return "El horario no está disponible.";

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!token) return;

    try {
      setSubmitting(true);

      const response = await createReservation(selectedSlot, token);

      setMessage(
        `Reserva exitosa. Referencia: ${response.reservation_id}`,
      );

      setForm({
        ...initialForm,
        studentName: user?.fullName || "",
        studentEmail: user?.email || "",
      });
      setSlots([]);
      setSelectedSlot("");
      await loadReservations();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible completar la reserva. Intenta de nuevo.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#fffaf5] px-6 py-16 text-[#1d1d1d]">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-[#e7d8c9] bg-white px-4 py-2 text-sm font-medium text-[#8b5e3c]">
            Reserva tu clase
          </span>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Agenda una clase de español personalizada
            </h1>

            <p className="max-w-2xl text-base leading-8 text-[#6b625b] md:text-lg">
              Elige el tipo de clase, tu nivel y el horario que mejor se adapte
              a ti. Los horarios y reservaciones se sincronizan con el backend
              de Classora.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-[#eadfd3] bg-white p-5 shadow-sm">
              <p className="text-sm text-[#8b5e3c]">Modalidad</p>
              <p className="mt-2 text-lg font-semibold">Online 1 a 1</p>
            </div>

            <div className="rounded-3xl border border-[#eadfd3] bg-white p-5 shadow-sm">
              <p className="text-sm text-[#8b5e3c]">Duración</p>
              <p className="mt-2 text-lg font-semibold">30, 45 o 60 min</p>
            </div>

            <div className="rounded-3xl border border-[#eadfd3] bg-white p-5 shadow-sm">
              <p className="text-sm text-[#8b5e3c]">Enfoque</p>
              <p className="mt-2 text-lg font-semibold">Conversación real</p>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#eadfd3] bg-[#fff] p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Mis reservaciones</h2>

            <div className="mt-4 space-y-3 text-[#5f5852]">
              {!isAuthenticated ? (
                <p className="text-sm">Inicia sesión para ver tus reservaciones.</p>
              ) : loadingReservations ? (
                <p className="text-sm">Cargando reservaciones...</p>
              ) : reservationsError ? (
                <p className="text-sm text-red-600">{reservationsError}</p>
              ) : reservations.length === 0 ? (
                <p className="text-sm">Todavía no tienes reservaciones.</p>
              ) : (
                reservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="rounded-2xl border border-[#eadfd3] bg-[#fffdfb] p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium text-[#1d1d1d]">
                        {getReservationClassName(reservation)}
                      </p>
                      <span className="rounded-full border border-[#dfd2c6] bg-white px-3 py-1 text-xs font-medium text-[#8b5e3c]">
                        {reservation.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm">
                      {formatDate(getReservationDate(reservation))} · {reservation.class_schedule?.time || "Horario no disponible"}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#eadfd3] bg-white p-6 shadow-lg md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Completa tu reserva</h2>
            <p className="mt-2 text-sm leading-7 text-[#6b625b]">
              Selecciona tus preferencias y después elige un horario disponible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="studentName" className="text-sm font-medium">
                  Nombre
                </label>
                <input
                  id="studentName"
                  name="studentName"
                  type="text"
                  value={form.studentName}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full rounded-2xl border border-[#dfd2c6] bg-[#fffdfb] px-4 py-3 outline-none transition focus:border-[#b5855b]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="studentEmail" className="text-sm font-medium">
                  Correo electrónico
                </label>
                <input
                  id="studentEmail"
                  name="studentEmail"
                  type="email"
                  value={form.studentEmail}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full rounded-2xl border border-[#dfd2c6] bg-[#fffdfb] px-4 py-3 outline-none transition focus:border-[#b5855b]"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Fecha
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-2xl border border-[#dfd2c6] bg-[#fffdfb] px-4 py-3 outline-none transition focus:border-[#b5855b]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="timezone" className="text-sm font-medium">
                  Zona horaria
                </label>
                <input
                  id="timezone"
                  name="timezone"
                  type="text"
                  value={form.timezone}
                  onChange={handleChange}
                  placeholder="America/Mexico_City"
                  className="w-full rounded-2xl border border-[#dfd2c6] bg-[#fffdfb] px-4 py-3 outline-none transition focus:border-[#b5855b]"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="space-y-2">
                <label htmlFor="lessonType" className="text-sm font-medium">
                  Tipo de clase
                </label>
                <select
                  id="lessonType"
                  name="lessonType"
                  value={form.lessonType}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#dfd2c6] bg-[#fffdfb] px-4 py-3 outline-none transition focus:border-[#b5855b]"
                >
                  {lessonTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="level" className="text-sm font-medium">
                  Nivel
                </label>
                <select
                  id="level"
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#dfd2c6] bg-[#fffdfb] px-4 py-3 outline-none transition focus:border-[#b5855b]"
                >
                  {lessonLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="duration" className="text-sm font-medium">
                  Duración
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#dfd2c6] bg-[#fffdfb] px-4 py-3 outline-none transition focus:border-[#b5855b]"
                >
                  {durations.map((duration) => (
                    <option key={duration} value={duration}>
                      {duration} minutos
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Horarios disponibles</p>

              <div className="rounded-2xl border border-[#eadfd3] bg-[#fffdfb] p-4">
                {loadingSlots ? (
                  <p className="text-sm text-[#6b625b]">Cargando horarios...</p>
                ) : !isAuthenticated ? (
                  <p className="text-sm text-[#6b625b]">
                    Inicia sesión para consultar horarios reales.
                  </p>
                ) : slots.length === 0 ? (
                  <p className="text-sm text-[#6b625b]">
                    Selecciona fecha, duración y zona horaria para ver
                    disponibilidad.
                  </p>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {slots.map((slot) => {
                      const isSelected = selectedSlot === slot.id;

                      return (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setSelectedSlot(slot.id)}
                          className={`rounded-2xl border px-4 py-3 text-left transition disabled:cursor-not-allowed disabled:opacity-60 ${
                            isSelected
                              ? "border-[#8b5e3c] bg-[#f8efe8]"
                              : "border-[#dfd2c6] bg-white hover:border-[#c7a88c]"
                          }`}
                        >
                          <p className="font-medium">{slot.className}</p>
                          <p className="mt-1 text-sm text-[#6b625b]">
                            {slot.startTime} - {slot.endTime}
                          </p>
                          <p className="mt-1 text-xs text-[#8b5e3c]">
                            {slot.teacherName}
                            {slot.spacesAvailable !== null
                              ? ` · ${slot.spacesAvailable} cupos`
                              : ""}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notas adicionales
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={form.notes}
                onChange={handleChange}
                placeholder="Cuéntame qué te gustaría practicar en clase..."
                className="w-full rounded-2xl border border-[#dfd2c6] bg-[#fffdfb] px-4 py-3 outline-none transition focus:border-[#b5855b]"
              />
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            ) : null}

            {message ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting || !isAuthenticated}
              className="w-full rounded-2xl bg-[#8b5e3c] px-5 py-4 font-medium text-white transition hover:bg-[#744b2d] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Reservando..." : "Confirmar reserva"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
