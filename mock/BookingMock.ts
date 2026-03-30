import { TimeSlot } from "../Interface/BookingInterface";

export const mockAvailableSlots: TimeSlot[] = [
  {
    id: "slot-1",
    label: "09:00 AM",
    startTime: "09:00",
    endTime: "10:00",
    available: true,
  },
  {
    id: "slot-2",
    label: "11:00 AM",
    startTime: "11:00",
    endTime: "12:00",
    available: true,
  },
  {
    id: "slot-3",
    label: "02:00 PM",
    startTime: "14:00",
    endTime: "15:00",
    available: true,
  },
  {
    id: "slot-4",
    label: "05:00 PM",
    startTime: "17:00",
    endTime: "18:00",
    available: true,
  },
];
