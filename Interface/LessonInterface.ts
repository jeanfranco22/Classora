export interface Lesson {
  id: string | number;
  title: string;
  description: string;
  level: "Principiante" | "Intermedio" | "Avanzado" | "Todos";
  duration: string;
  price: string;
  href: string;
  focus: string[];
  image?: string | null;
}

export interface BackendClass {
  id: string;
  name: string;
  description?: string | null;
  duration: string;
  benefits?: string[] | null;
  imgUrl?: string | null;
  intensity?: "alta" | "media" | "baja" | string;
}
