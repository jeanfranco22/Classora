import { Certification, Review, TeachingStep } from "../Interface/Home";

export const reviews: Review[] = [
  {
    id: 1,
    name: "Nicole Otto",
    title: "Spanish conversation",
    country: "Estados Unidos",
    text: "Las clases con Carolina me ayudaron a perder el miedo a hablar. Ahora puedo mantener conversaciones mucho más fluidas y naturales.",
    image: "/img2.jpg",
  },
  {
    id: 2,
    name: "Hanna Barlito",
    title: "Practice conversation",
    country: "Canadá",
    text: "Me gusta mucho que las clases son personalizadas. Practicamos temas reales y eso me ayuda bastante en mi día a día.",
    image: "img1.jpg",
  },
  {
    id: 3,
    name: "Andres Apple",
    title: "Spanish and learn",
    country: "Francia",
    text: "Carolina explica con mucha paciencia y hace que aprender español sea un proceso muy agradable y dinámico.",
    image: "img3.jpg",
  },
];

export const teachingSteps: TeachingStep[] = [
  {
    id: 1,
    title: "Evaluación inicial",
    description:
      "Primero identificamos tu nivel, tus objetivos y las áreas que quieres mejorar.",
  },
  {
    id: 2,
    title: "Clases personalizadas",
    description:
      "Cada sesión se adapta a tu ritmo, intereses y necesidades de comunicación.",
  },
  {
    id: 3,
    title: "Práctica en conversación",
    description:
      "Trabajamos vocabulario, pronunciación y confianza con ejercicios reales.",
  },
  {
    id: 4,
    title: "Seguimiento continuo",
    description:
      "Recibes guía constante para medir tu progreso y seguir avanzando.",
  },
];

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Certificacion de Ingles",
    subtitle: "EFSET",
  },
  {
    id: 2,
    title: "Especialización en Conversación y Pronunciación",
    subtitle: "Programa de Formación Docente",
  },
  {
    id: 3,
    title: "Experiencia con estudiantes internacionales",
    subtitle: "Clases online para diferentes niveles y objetivos",
  },
];
