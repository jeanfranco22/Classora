import {
  BookingPayload,
  BookingResponse,
  GetAvailableSlotsParams,
  TimeSlot,
} from "../../Interface/BookingInterface";
import { mockAvailableSlots } from "../../mock/BookingMock";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAvailableSlots(
  params: GetAvailableSlotsParams,
): Promise<TimeSlot[]> {
  /**
   * Cuando conectes backend:
   *
   * const response = await fetch(
   *   `${API_URL}/bookings/available-slots?date=${params.date}&duration=${params.duration}&timezone=${params.timezone}`,
   *   { method: "GET", cache: "no-store" }
   * );
   *
   * if (!response.ok) throw new Error("Error loading slots");
   * return response.json();
   */

  await new Promise((resolve) => setTimeout(resolve, 400));

  return mockAvailableSlots.filter((slot) => slot.available);
}

export async function createBooking(
  payload: BookingPayload,
): Promise<BookingResponse> {
  /**
   * Cuando conectes backend:
   *
   * const response = await fetch(`${API_URL}/bookings`, {
   *   method: "POST",
   *   headers: {
   *     "Content-Type": "application/json",
   *   },
   *   body: JSON.stringify(payload),
   * });
   *
   * if (!response.ok) throw new Error("Error creating booking");
   * return response.json();
   */

  console.log("Booking payload listo para backend:", payload);

  await new Promise((resolve) => setTimeout(resolve, 700));

  return {
    success: true,
    bookingId: `BOOK-${Date.now()}`,
    message: "Reserva creada correctamente",
  };
}
