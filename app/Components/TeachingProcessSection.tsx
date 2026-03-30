import { teachingSteps } from "../../data/HomeData";

const TeachingProcessSection = () => {
  return (
    <section className="relative bg-white px-6 py-24 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="rounded-full border border-[#d9dde7] bg-[#f8fafc] px-4 py-2 text-sm font-medium text-[#52607a] shadow-sm">
            Metodología
          </span>

          <h2 className="mt-6 text-4xl font-bold text-[#1f2a44] md:text-5xl">
            ¿Cómo son las clases?
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#667085] md:text-lg">
            Cada clase está pensada para ayudarte a comunicarte mejor en
            situaciones reales, con sesiones dinámicas, prácticas y adaptadas a
            tus metas personales.
          </p>
        </div>

        <div className="grid gap-5">
          {teachingSteps.map((step) => (
            <article
              key={step.id}
              className="rounded-3xl border border-[#e4e7ec] bg-[#f9fafb] p-6 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2b3651] text-lg font-bold text-white">
                {step.id}
              </div>

              <h3 className="text-xl font-semibold text-[#1f2a44]">
                {step.title}
              </h3>

              <p className="mt-3 text-base leading-7 text-[#667085]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeachingProcessSection;
