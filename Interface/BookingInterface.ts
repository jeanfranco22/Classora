export type LessonType =
  | "Conversación"
  | "Gramática"
  | "Preparación para entrevistas"
  | "Español para viajar"
  | "Español de negocios";

export type LessonLevel = "Principiante" | "Intermedio" | "Avanzado";

export interface BookingFormData {
  studentName: string;
  studentEmail: string;
  date: string;
  lessonType: LessonType;
  level: LessonLevel;
  duration: number;
  timezone: string;
  notes: string;
}

export interface TimeSlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface GetAvailableSlotsParams {
  date: string;
  duration: number;
  timezone: string;
}

export interface BookingPayload {
  studentName: string;
  studentEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  lessonType: LessonType;
  level: LessonLevel;
  duration: number;
  timezone: string;
  notes?: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId: string;
  message: string;
}
