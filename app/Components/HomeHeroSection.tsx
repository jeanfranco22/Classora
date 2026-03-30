import Image from "next/image";

const HomeHeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f7f7f5] text-[#1f2a44]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(31,42,68,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(31,42,68,0.06)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 md:px-10">
        <div className="relative flex flex-1 items-center justify-center py-16 md:py-24">
          <div className="absolute left-[6%] top-[42%] hidden items-center gap-3 lg:flex">
            <div className="rounded-full bg-[#2b3651] px-4 py-2 text-sm font-semibold text-white shadow-lg">
              👩‍🏫 Carolina Rodriguez
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#e1e5ee] bg-white shadow-md">
              <div className="h-0 w-0 rotate-45 border-b-[12px] border-l-[12px] border-r-[12px] border-t-[12px] border-b-transparent border-l-transparent border-r-[#ff6b6b] border-t-transparent" />
            </div>
          </div>

          <div className="absolute right-[8%] top-[34%] hidden items-center gap-3 lg:flex">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#e1e5ee] bg-white shadow-md">
              <div className="grid grid-cols-2 gap-1">
                <span className="h-3 w-3 rounded-full bg-pink-500" />
                <span className="h-3 w-3 rounded-full bg-orange-400" />
                <span className="h-3 w-3 rounded-full bg-cyan-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>
            </div>

            <div className="rounded-full bg-[#2b3651] px-4 py-2 text-sm font-semibold text-white shadow-lg">
              👩‍💻
            </div>
          </div>

          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 scale-110 rounded-full bg-white/70 blur-xl" />
              <div className="relative h-56 w-56 overflow-hidden rounded-full border-[8px] border-white bg-[#ececf1] shadow-xl md:h-64 md:w-64">
                <Image
                  src="/profile.jpg"
                  alt="Foto de Carolina Rodriguez"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full border border-[#d9dde7] bg-white/80 px-4 py-2 text-sm font-medium text-[#52607a] shadow-sm">
                Clases en Vivo
              </span>
              <span className="rounded-full border border-[#d9dde7] bg-white/80 px-4 py-2 text-sm font-medium text-[#52607a] shadow-sm">
                Práctica del Idioma
              </span>
              <span className="rounded-full border border-[#d9dde7] bg-white/80 px-4 py-2 text-sm font-medium text-[#52607a] shadow-sm">
                Conversación
              </span>
            </div>

            <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-[#1f2a44] md:text-7xl">
              <span className="text-[#6b7892]">Carolina</span>{" "}
              <span className="text-black">Rodriguez</span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-[#667085] md:text-xl">
              Te ayudo a mejorar tu español con clases personalizadas donde
              podrás practicar, ganar confianza y expresarte de forma natural.
              Cada sesión está diseñada para que aprendas a tu ritmo y disfrutes
              el proceso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
