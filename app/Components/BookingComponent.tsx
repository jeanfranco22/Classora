"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookingFormData,
  BookingPayload,
  BookingResponse,
  LessonLevel,
  LessonType,
  TimeSlot,
} from "../../Interface/BookingInterface";
import { createBooking, getAvailableSlots } from "../services/BookingServices";

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

export function BookingComponent() {
  const [form, setForm] = useState<BookingFormData>(initialForm);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const canFetchSlots = useMemo(() => {
    return Boolean(form.date && form.duration && form.timezone);
  }, [form.date, form.duration, form.timezone]);

  useEffect(() => {
    const loadSlots = async () => {
      if (!canFetchSlots) {
        setSlots([]);
        setSelectedSlot("");
        return;
      }

      try {
        setLoadingSlots(true);
        setError("");
        setMessage("");

        const data = await getAvailableSlots({
          date: form.date,
          duration: form.duration,
          timezone: form.timezone,
        });

        setSlots(data);
        setSelectedSlot("");
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los horarios disponibles.");
      } finally {
        setLoadingSlots(false);
      }
    };

    loadSlots();
  }, [canFetchSlots, form.date, form.duration, form.timezone]);

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
    if (!form.studentName.trim()) return "El nombre es obligatorio.";
    if (!form.studentEmail.trim()) return "El correo es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(form.studentEmail)) {
      return "Ingresa un correo válido.";
    }
    if (!form.date) return "Selecciona una fecha.";
    if (!selectedSlot) return "Selecciona un horario disponible.";

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

    const slot = slots.find((item) => item.id === selectedSlot);
    if (!slot) {
      setError("El horario seleccionado ya no está disponible.");
      return;
    }

    const payload: BookingPayload = {
      studentName: form.studentName.trim(),
      studentEmail: form.studentEmail.trim(),
      date: form.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      lessonType: form.lessonType,
      level: form.level,
      duration: form.duration,
      timezone: form.timezone,
      notes: form.notes.trim(),
    };

    try {
      setSubmitting(true);

      const response: BookingResponse = await createBooking(payload);

      setMessage(
        `Clase reservada con éxito. Referencia: ${response.bookingId}`,
      );

      setForm(initialForm);
      setSlots([]);
      setSelectedSlot("");
    } catch (err) {
      console.error(err);
      setError("No fue posible completar la reserva. Intenta de nuevo.");
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
              a ti. La experiencia está preparada para conectarse fácilmente con
              tu backend cuando quieras integrar disponibilidad real, pagos y
              confirmaciones automáticas.
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
            <h2 className="text-xl font-semibold">¿Qué incluye la clase?</h2>
            <ul className="mt-4 space-y-3 text-[#5f5852]">
              <li>• Sesión adaptada a tu nivel y objetivos</li>
              <li>• Práctica conversacional guiada</li>
              <li>• Correcciones y recomendaciones personalizadas</li>
              <li>• Espacio para notas o temas específicos</li>
            </ul>
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
                          onClick={() => setSelectedSlot(slot.id)}
                          className={`rounded-2xl border px-4 py-3 text-left transition ${
                            isSelected
                              ? "border-[#8b5e3c] bg-[#f8efe8]"
                              : "border-[#dfd2c6] bg-white hover:border-[#c7a88c]"
                          }`}
                        >
                          <p className="font-medium">{slot.label}</p>
                          <p className="mt-1 text-sm text-[#6b625b]">
                            {slot.startTime} - {slot.endTime}
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
              disabled={submitting}
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
