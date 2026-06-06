"use client";

import Link from "next/link";
import { User } from "@/Interface/UserInterface";

type DashboardAction = {
  label: string;
  href: string;
};

type DashboardShellProps = {
  user: User;
  eyebrow: string;
  title: string;
  description: string;
  actions: DashboardAction[];
  stats: {
    label: string;
    value: string;
  }[];
};

export function DashboardShell({
  user,
  eyebrow,
  title,
  description,
  actions,
  stats,
}: DashboardShellProps) {
  return (
    <section className="min-h-screen bg-[#fffaf5] px-6 py-16 text-[#1d1d1d]">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-4">
          <span className="inline-flex rounded-full border border-[#e7d8c9] bg-white px-4 py-2 text-sm font-medium text-[#8b5e3c]">
            {eyebrow}
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              {title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-[#6b625b] md:text-lg">
              {description}
            </p>
          </div>
          <p className="text-sm text-[#6b625b]">
            Sesión activa: <span className="font-medium">{user.fullName}</span>{" "}
            · {user.email}
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[28px] border border-[#eadfd3] bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-[#8b5e3c]">{stat.label}</p>
              <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[28px] border border-[#eadfd3] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Accesos rápidos</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {actions.map((action) => (
              <Link
                key={`${action.label}-${action.href}`}
                href={action.href}
                className="rounded-full border border-[#dfd2c6] bg-[#fffdfb] px-5 py-3 text-sm font-semibold text-[#1d1d1d] transition hover:border-[#b5855b]"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
