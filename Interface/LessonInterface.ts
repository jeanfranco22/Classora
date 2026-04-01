export interface Lesson {
  id: number;
  title: string;
  description: string;
  level: "Principiante" | "Intermedio" | "Avanzado" | "Todos";
  duration: string;
  price: string;
  href: string;
  focus: string[];
}
