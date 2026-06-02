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
  className: string;
  teacherName: string;
  spacesAvailable: number | null;
}

export interface GetAvailableSlotsParams {
  date: string;
  duration: number;
  timezone: string;
}

export interface BackendClassSchedule {
  id: string;
  date: string;
  time: string;
  token: number;
  isActive: boolean;
  spaces_available?: number;
  class?: {
    id: string;
    name: string;
    duration?: string;
    capacity?: number;
    intensity?: string;
  };
  teacher?: {
    id: string;
    name: string;
    email?: string;
  };
  coach?: {
    id: string;
    name: string;
    email?: string;
  };
}

export interface BackendReservation {
  id: string;
  date: string;
  status: string;
  class_schedule?: BackendClassSchedule;
}

export interface CreateReservationResponse {
  success: boolean;
  message: string;
  reservation_id: string;
}

export interface BackendTeacherReservation {
  id: string;
  date: string;
  status: string;
  users?: {
    id: string;
    name: string;
    email: string;
  };
  class_schedule?: BackendClassSchedule;
}
