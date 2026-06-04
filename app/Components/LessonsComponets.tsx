import type { Lesson } from "../../Interface/LessonInterface";
import Link from "next/link";
import { getLessons } from "../services/LessonServices";

const LessonCard = ({ lesson }: { lesson: Lesson }) => {
  return (
    <article className="group rounded-[28px] border border-[#d9dde7] bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full border border-[#d9dde7] bg-[#f7f7f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#52607a]">
          {lesson.level}
        </span>

        <span className="text-sm font-medium text-[#667085]">
          {lesson.duration}
        </span>
      </div>

      <h3 className="text-2xl font-bold tracking-tight text-[#1f2a44]">
        {lesson.title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#667085] md:text-base">
        {lesson.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {lesson.focus.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[#d9dde7] bg-white px-3 py-1 text-sm text-[#52607a]"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-lg font-semibold text-[#1f2a44]">{lesson.price}</p>

        <Link
          href={lesson.href}
          className="rounded-full border border-[#d9dde7] bg-[#1f2a44] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Reservar
        </Link>
      </div>
    </article>
  );
};

const LessonsComponent = async () => {
  let lessons: Lesson[] = [];
  let error = "";

  try {
    lessons = await getLessons();
  } catch (err) {
    console.error(err);
    error =
      err instanceof Error
        ? err.message
        : "No se pudieron cargar las clases desde Classora.";
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f7f7f5] text-[#1f2a44]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(31,42,68,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(31,42,68,0.06)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="absolute left-1/2 top-40 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#d9dde7] bg-white/80 px-4 py-2 text-sm font-medium text-[#52607a] shadow-sm">
            Clases personalizadas de español
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#1f2a44] md:text-6xl">
            Aprende y practica <span className="text-black">español</span> con
            clases diseñadas para ti
          </h1>

          <p className="mt-6 text-base leading-8 text-[#667085] md:text-xl">
            Explora clases enfocadas en conversación, gramática, pronunciación y
            fluidez. Cada sesión está pensada para ayudarte a avanzar con
            confianza y usar el idioma en situaciones reales.
          </p>
        </header>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full border border-[#d9dde7] bg-white/80 px-4 py-2 text-sm font-medium text-[#52607a] shadow-sm">
            Conversación real
          </span>
          <span className="rounded-full border border-[#d9dde7] bg-white/80 px-4 py-2 text-sm font-medium text-[#52607a] shadow-sm">
            Todos los niveles
          </span>
          <span className="rounded-full border border-[#d9dde7] bg-white/80 px-4 py-2 text-sm font-medium text-[#52607a] shadow-sm">
            Sesiones 1 a 1
          </span>
        </div>

        {error ? (
          <div className="mt-16 rounded-[28px] border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
            {error}
          </div>
        ) : lessons.length === 0 ? (
          <div className="mt-16 rounded-[28px] border border-[#d9dde7] bg-white/80 p-6 text-center text-sm text-[#667085]">
            No hay clases disponibles por ahora.
          </div>
        ) : (
          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LessonsComponent;
