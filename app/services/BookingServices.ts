import {
  BackendClassSchedule,
  BackendReservation,
  BookingPayload,
  BookingResponse,
  CreateReservationResponse,
  GetAvailableSlotsParams,
  TimeSlot,
} from "../../Interface/BookingInterface";
import { mockAvailableSlots } from "../../mock/BookingMock";
import { apiClient } from "./apiClient";

export async function getClassSchedules(
  token?: string | null,
): Promise<BackendClassSchedule[]> {
  return apiClient<BackendClassSchedule[]>("/class-schedules", {
    method: "GET",
    token,
    cache: "no-store",
  });
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

export async function getAvailableSlots(
  params: GetAvailableSlotsParams,
): Promise<TimeSlot[]> {
  try {
    const schedules = await getClassSchedules();
    const filteredSchedules = schedules.filter((schedule) => {
      const scheduleDate = schedule.date?.split("T")[0];
      const duration = Number(schedule.class?.duration || params.duration);

      return (
        schedule.isActive &&
        scheduleDate === params.date &&
        (!params.duration || duration === params.duration)
      );
    });

    if (filteredSchedules.length) {
      return filteredSchedules.map((schedule) => ({
        id: schedule.id,
        label: schedule.time,
        startTime: schedule.time,
        endTime: schedule.time,
        available: (schedule.spaces_available ?? 1) > 0,
      }));
    }
  } catch (error) {
    console.error("Error loading backend class schedules, using slot fallback:", error);
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockAvailableSlots.filter((slot) => slot.available);
}

export async function createBooking(
  payload: BookingPayload,
): Promise<BookingResponse> {
  console.log(
    "Booking payload pending classScheduleId mapping for Phase 4:",
    payload,
  );

  await new Promise((resolve) => setTimeout(resolve, 700));

  return {
    success: true,
    bookingId: `BOOK-${Date.now()}`,
    message: "Reserva preparada. Falta seleccionar classScheduleId real para enviarla al backend.",
  };
}
