import {
  BackendClassSchedule,
  BackendReservation,
  CreateReservationResponse,
  GetAvailableSlotsParams,
  TimeSlot,
} from "../../Interface/BookingInterface";
import { apiClient } from "./apiClient";

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

export function mapScheduleToTimeSlot(
  schedule: BackendClassSchedule,
  fallbackDuration: number,
): TimeSlot {
  const duration = getScheduleDuration(schedule, fallbackDuration);
  const spacesAvailable = schedule.spaces_available ?? null;

  return {
    id: schedule.id,
    label: `${schedule.time} - ${schedule.class?.name || "Clase"}`,
    startTime: schedule.time,
    endTime: addMinutes(schedule.time, duration),
    available: schedule.isActive && (spacesAvailable === null || spacesAvailable > 0),
    className: schedule.class?.name || "Clase de español",
    teacherName: schedule.teacher?.name || schedule.coach?.name || "Profesor por asignar",
    spacesAvailable,
  };
}

export async function getClassSchedules(
  token: string,
): Promise<BackendClassSchedule[]> {
  return apiClient<BackendClassSchedule[]>("/class-schedules", {
    method: "GET",
    token,
    cache: "no-store",
  });
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
  return apiClient<CreateReservationResponse>(
    `/reservations?classScheduleId=${encodeURIComponent(classScheduleId)}`,
    {
      method: "POST",
      token,
    },
  );
}

export async function getMyReservations(
  token: string,
): Promise<BackendReservation[]> {
  return apiClient<BackendReservation[]>("/reservations/me", {
    method: "GET",
    token,
    cache: "no-store",
  });
}
