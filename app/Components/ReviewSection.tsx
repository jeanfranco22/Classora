"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { reviews } from "../../data/HomeData";

const ReviewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const activeReview = reviews[activeIndex];

  const previewReviews = reviews
    .filter((_, index) => index !== activeIndex)
    .slice(0, 2);

  return (
    <section className="bg-[#f5f5f2] px-6 py-20 md:px-10 lg:py-24">
      <div className="mx-auto max-w-[1380px]">
        <div className="mb-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex rounded-full border border-[#d9dde7] bg-white px-4 py-2 text-sm font-medium text-[#52607a] shadow-sm">
              Testimonios
            </span>

            <h2 className="mt-6 max-w-[680px] text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#1f2026] md:text-5xl xl:text-6xl">
              Una experiencia de aprendizaje más humana, visual y natural
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-3">
            <p className="max-w-[520px] text-lg leading-8 text-[#5f6470] md:text-[22px] md:leading-[1.5]">
              Cada estudiante avanza con clases personalizadas, práctica real y
              una metodología enfocada en hablar español con más confianza.
            </p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <article className="group relative overflow-hidden rounded-[36px] bg-[#d9d9dd] min-h-[520px] md:min-h-[620px]">
            {activeReview?.image && (
              <img
                src={activeReview.image}
                alt={activeReview.name}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            )}

            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(36,38,43,0.42),rgba(36,38,43,0.10),rgba(36,38,43,0.16))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_30%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10 lg:p-12">
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(reviews.length).padStart(2, "0")}
                </div>

                <button className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#1f2026] shadow-md transition hover:scale-[1.02] md:px-6 md:py-4 md:text-base">
                  <Play size={16} fill="currentColor" />
                  Ver historia
                </button>
              </div>

              <div className="max-w-[560px]">
                <h3 className="text-4xl font-medium leading-[0.95] tracking-[-0.05em] text-white md:text-6xl lg:text-[76px]">
                  {activeReview.title}
                </h3>

                <p className="mt-6 max-w-[460px] text-base leading-7 text-white/88 md:text-lg md:leading-8">
                  {activeReview.text}
                </p>
              </div>

              <div className="flex flex-col gap-6 border-t border-white/15 pt-6 md:flex-row md:items-end md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg font-semibold text-white backdrop-blur-md">
                    {activeReview.name?.charAt(0)}
                  </div>

                  <div>
                    <p className="text-lg font-medium text-white">
                      {activeReview.name}
                    </p>
                    <p className="text-sm text-white/75">
                      Estudiante · {activeReview.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={prevSlide}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                    aria-label="Siguiente"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </article>

          <aside className="grid gap-6 sm:grid-cols-2 xl:grid-cols-1">
            {previewReviews.map((review, index) => {
              const realIndex = reviews.findIndex(
                (item) => item.id === review.id,
              );

              return (
                <button
                  key={review.id}
                  onClick={() => setActiveIndex(realIndex)}
                  className="group relative overflow-hidden rounded-[30px] bg-[#d7d7db] text-left min-h-[260px] transition duration-300 hover:-translate-y-1"
                >
                  {review.image && (
                    <img
                      src={review.image}
                      alt={review.name}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                  )}

                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(30,32,38,0.58),rgba(30,32,38,0.12))]" />

                  <div className="relative z-10 flex h-full flex-col justify-end p-6">
                    <span className="mb-3 inline-flex w-fit rounded-full bg-white/12 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md">
                      Preview {index + 1}
                    </span>

                    <h4 className="text-2xl font-medium leading-tight tracking-[-0.03em] text-white">
                      {review.title}
                    </h4>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/80">
                      {review.text}
                    </p>
                  </div>
                </button>
              );
            })}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
