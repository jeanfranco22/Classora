import { BackendClass, Lesson } from "../../Interface/LessonInterface";
import { apiClient } from "./apiClient";

function mapIntensityToLevel(intensity?: string): Lesson["level"] {
  if (intensity === "alta") return "Avanzado";
  if (intensity === "media") return "Intermedio";
  if (intensity === "baja") return "Principiante";

  return "Todos";
}

function formatPrice(price: BackendClass["price"]) {
  if (price === null || price === undefined || price === "") return "Consultar";
  if (typeof price === "number") return `$${price}`;

  return price;
}

function mapClassToLesson(classItem: BackendClass): Lesson {
  return {
    id: classItem.id,
    title: classItem.name,
    description: classItem.description || "Clase personalizada de español.",
    level: mapIntensityToLevel(classItem.intensity),
    duration: classItem.duration,
    price: formatPrice(classItem.price),
    href: "/booking",
    focus: classItem.benefits?.length ? classItem.benefits : [],
    image: classItem.imgUrl ?? null,
  };
}

export async function getLessons(): Promise<Lesson[]> {
  const classes = await apiClient<BackendClass[]>("/classes", {
    method: "GET",
    cache: "no-store",
  });

  return classes.map(mapClassToLesson);
}
