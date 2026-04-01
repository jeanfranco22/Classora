import { certifications } from "../../data/HomeData";

const CertificationsSection = () => {
  return (
    <section className="relative bg-[#f7f7f5] px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="rounded-full border border-[#d9dde7] bg-white px-4 py-2 text-sm font-medium text-[#52607a] shadow-sm">
            Experiencia
          </span>

          <h2 className="mt-6 text-4xl font-bold text-[#1f2a44] md:text-5xl">
            Certificaciones y preparación
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#667085] md:text-lg">
            Una base profesional que respalda cada clase y garantiza un proceso
            de aprendizaje claro, humano y efectivo.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {certifications.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-[#e4e7ec] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef2f7] text-2xl">
                🎓
              </div>

              <h3 className="text-xl font-semibold text-[#1f2a44]">
                {item.title}
              </h3>

              <p className="mt-3 text-base leading-7 text-[#667085]">
                {item.subtitle}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
