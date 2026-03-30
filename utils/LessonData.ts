import type { Lesson } from "../Interface/LessonInterface";

export const lessonsData: Lesson[] = [
  {
    id: 1,
    title: "Español conversacional",
    description:
      "Una clase enfocada en hablar con naturalidad, mejorar tu confianza y practicar situaciones reales del día a día.",
    level: "Todos",
    duration: "50 min",
    price: "$18 USD",
    href: "/booking",
    focus: ["Hablar", "Escuchar", "Fluidez"],
  },
  {
    id: 2,
    title: "Gramática en contexto",
    description:
      "Aprende estructuras gramaticales de manera clara y práctica, aplicándolas en ejemplos útiles y conversaciones reales.",
    level: "Intermedio",
    duration: "50 min",
    price: "$20 USD",
    href: "/booking",
    focus: ["Gramática", "Ejercicios", "Expresión"],
  },
  {
    id: 3,
    title: "Español para principiantes",
    description:
      "Empieza desde cero con clases guiadas paso a paso para construir una base sólida en vocabulario, comprensión y pronunciación.",
    level: "Principiante",
    duration: "50 min",
    price: "$18 USD",
    href: "/booking",
    focus: ["Vocabulario", "Pronunciación", "Bases"],
  },
  {
    id: 4,
    title: "Pronunciación y confianza",
    description:
      "Trabaja sonidos, entonación y claridad al hablar para comunicarte con más seguridad y sonar más natural.",
    level: "Todos",
    duration: "45 min",
    price: "$17 USD",
    href: "/booking",
    focus: ["Pronunciación", "Entonación", "Seguridad"],
  },
  {
    id: 5,
    title: "Español avanzado",
    description:
      "Clases para estudiantes que desean perfeccionar su fluidez, ampliar vocabulario y sostener conversaciones más complejas.",
    level: "Avanzado",
    duration: "60 min",
    price: "$22 USD",
    href: "/booking",
    focus: ["Fluidez", "Vocabulario", "Precisión"],
  },
  {
    id: 6,
    title: "Clase personalizada",
    description:
      "Una sesión adaptada completamente a tus objetivos: conversación, preparación para viajes, trabajo o práctica general.",
    level: "Todos",
    duration: "50 min",
    price: "$21 USD",
    href: "/booking",
    focus: ["Personalizada", "Objetivos", "Práctica real"],
  },
];
