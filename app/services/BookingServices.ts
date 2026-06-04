import {
  BackendClassSchedule,
  BackendReservation,
  BackendTeacherReservation,
  CreateReservationResponse,
  GetAvailableSlotsParams,
  TimeSlot,
} from "../../Interface/BookingInterface";
import { apiClient } from "./apiClient";

interface BackendCreateReservationResponse {
  success?: boolean;
  message?: string;
  reservation_id?: string;
  reservationId?: string;
  id?: string;
  reservation?: {
    id?: string;
    reservation_id?: string;
    reservationId?: string;
  };
}

function normalizeDate(date: string) {
  return date?.split("T")[0];
}

function addMinutes(time: string, minutes: number) {
  const [hours = "0", mins = "0"] = time.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(mins), 0, 0);
  date.setMinutes(date.getMinutes() + minutes);

  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
}

function getScheduleDuration(schedule: BackendClassSchedule, fallback: number) {
  const duration = Number.parseInt(schedule.class?.duration || "", 10);
  return Number.isFinite(duration) ? duration : fallback;
}

function normalizeSchedule(schedule: BackendClassSchedule): BackendClassSchedule {
  return {
    ...schedule,
    spaces_available: schedule.spaces_available ?? schedule.spacesAvailable,
    isActive: schedule.isActive ?? true,
  };
}

function normalizeReservation<T extends BackendReservation | BackendTeacherReservation>(
  reservation: T,
): T {
  return {
    ...reservation,
    class_schedule: reservation.class_schedule ?? reservation.classSchedule,
    ...("users" in reservation || "user" in reservation
      ? { users: reservation.users ?? reservation.user }
      : {}),
  };
}

export function mapScheduleToTimeSlot(
  schedule: BackendClassSchedule,
  fallbackDuration: number,
): TimeSlot {
  const normalizedSchedule = normalizeSchedule(schedule);
  const duration = getScheduleDuration(normalizedSchedule, fallbackDuration);
  const spacesAvailable = normalizedSchedule.spaces_available ?? null;

  return {
    id: normalizedSchedule.id,
    label: `${normalizedSchedule.time} - ${normalizedSchedule.class?.name || "Clase"}`,
    startTime: normalizedSchedule.time,
    endTime: addMinutes(normalizedSchedule.time, duration),
    available:
      normalizedSchedule.isActive &&
      (spacesAvailable === null || spacesAvailable > 0),
    className: normalizedSchedule.class?.name || "Clase de español",
    teacherName:
      normalizedSchedule.teacher?.name ||
      normalizedSchedule.coach?.name ||
      "Profesor por asignar",
    spacesAvailable,
  };
}

export async function getClassSchedules(
  token: string,
): Promise<BackendClassSchedule[]> {
  const schedules = await apiClient<BackendClassSchedule[]>("/class-schedules", {
    method: "GET",
    token,
    cache: "no-store",
  });

  return schedules.map(normalizeSchedule);
}

export async function getAvailableSlots(
  params: GetAvailableSlotsParams,
  token: string,
): Promise<TimeSlot[]> {
  const schedules = await getClassSchedules(token);

  return schedules
    .filter((schedule) => {
      const scheduleDate = normalizeDate(schedule.date);
      const duration = getScheduleDuration(schedule, params.duration);

      return (
        schedule.isActive &&
        scheduleDate === params.date &&
        (!params.duration || duration === params.duration)
      );
    })
    .map((schedule) => mapScheduleToTimeSlot(schedule, params.duration));
}

export async function createReservation(
  classScheduleId: string,
  token: string,
): Promise<CreateReservationResponse> {
  const response = await apiClient<BackendCreateReservationResponse>(
    "/reservation/reserve",
    {
      method: "POST",
      token,
      body: { classScheduleId },
    },
  );

  const reservationId =
    response.reservation_id ||
    response.reservationId ||
    response.id ||
    response.reservation?.reservation_id ||
    response.reservation?.reservationId ||
    response.reservation?.id ||
    classScheduleId;

  return {
    success: response.success ?? true,
    message: response.message || "Reserva creada correctamente.",
    reservation_id: reservationId,
  };
}

export async function getMyReservations(
  token: string,
): Promise<BackendReservation[]> {
  const reservations = await apiClient<BackendReservation[]>("/reservations/me", {
    method: "GET",
    token,
    cache: "no-store",
  });

  return reservations.map(normalizeReservation);
}

export async function getTeacherReservations(
  token: string,
): Promise<BackendTeacherReservation[]> {
  const reservations = await apiClient<BackendTeacherReservation[]>(
    "/reservations/teacher/me",
    {
      method: "GET",
      token,
      cache: "no-store",
    },
  );

  return reservations.map(normalizeReservation);
}
