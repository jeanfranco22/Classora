import { BackendClass, Lesson } from "../../Interface/LessonInterface";
import { lessonsData } from "../../utils/LessonData";
import { apiClient } from "./apiClient";

const TEMPORARY_PRICE_FALLBACK = "$18 USD";

function mapIntensityToLevel(intensity?: string): Lesson["level"] {
  if (intensity === "alta") return "Avanzado";
  if (intensity === "media") return "Intermedio";
  if (intensity === "baja") return "Principiante";

  return "Todos";
}

function mapClassToLesson(classItem: BackendClass): Lesson {
  return {
    id: classItem.id,
    title: classItem.name,
    description: classItem.description || "Clase personalizada de español.",
    level: mapIntensityToLevel(classItem.intensity),
    duration: classItem.duration,
    price: TEMPORARY_PRICE_FALLBACK,
    href: "/booking",
    focus: classItem.benefits?.length ? classItem.benefits : ["Español", "Práctica", "Aprendizaje"],
    image: classItem.imgUrl ?? null,
  };
}

export async function getLessons(): Promise<Lesson[]> {
  try {
    const classes = await apiClient<BackendClass[]>("/classes", {
      method: "GET",
      cache: "no-store",
    });

    if (!classes.length) return lessonsData;

    return classes.map(mapClassToLesson);
  } catch (error) {
    console.error("Error loading backend classes, using local lesson fallback:", error);
    return lessonsData;
  }
}
