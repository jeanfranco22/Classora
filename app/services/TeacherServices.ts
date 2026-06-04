import { Teacher, TeacherSummary } from "../../Interface/TeacherInterface";
import { apiClient } from "./apiClient";

export async function getTeachers(token: string): Promise<Teacher[]> {
  return apiClient<Teacher[]>("/teachers", {
    method: "GET",
    token,
    cache: "no-store",
  });
}

export async function getTeacherNameAndImg(): Promise<TeacherSummary[]> {
  return apiClient<TeacherSummary[]>("/teachers/nameAndImg", {
    method: "GET",
    cache: "no-store",
  });
}

export async function getTeacherByEmail(
  email: string,
  token: string,
): Promise<Teacher> {
  return apiClient<Teacher>(
    `/teachers/email?email=${encodeURIComponent(email)}`,
    {
      method: "GET",
      token,
      cache: "no-store",
    },
  );
}

export async function getTeacherById(
  teacherId: string,
  token: string,
): Promise<Teacher> {
  return apiClient<Teacher>(`/teachers/${encodeURIComponent(teacherId)}`, {
    method: "GET",
    token,
    cache: "no-store",
  });
}
