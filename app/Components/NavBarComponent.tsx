"use client";

import { UserRole } from "@/Interface/UserInterface";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
};

type NavRole = UserRole | "guest";

const roleItems: Record<NavRole, NavItem[]> = {
  guest: [
    { label: "Inicio", href: "/" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ],
  student: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Lecciones", href: "/lessons" },
    { label: "Mis reservas", href: "/booking" },
    { label: "Perfil", href: "/dashboard" },
  ],
  teacher: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Mis clases", href: "/lessons" },
    { label: "Reservas", href: "/booking" },
    { label: "Panel docente", href: "/teacher" },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Usuarios", href: "/dashboard" },
    { label: "Clases", href: "/lessons" },
    { label: "Reservas", href: "/booking" },
    { label: "Admin", href: "/dashboard" },
  ],
};

const NavBarComponent = () => {
  const { dataUser, logout, initializing } = useAuth();
  const role: NavRole =
    dataUser.isAuthenticated && dataUser.user ? dataUser.user.role : "guest";
  const items = initializing ? roleItems.guest : roleItems[role];

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="relative overflow-hidden bg-[#f7f7f5]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(31,42,68,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(31,42,68,0.06)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-3 px-4 py-3 md:grid md:grid-cols-[auto_1fr_auto] md:items-center md:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-[#1f2a44]"
          >
            Classora
          </Link>
        </div>

        <div className="flex justify-start md:justify-center">
          <div className="flex flex-wrap items-center gap-2 rounded-3xl border border-[#d9dde7] bg-white/80 px-3 py-2 shadow-sm backdrop-blur md:rounded-full">
            {items.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="rounded-full px-5 py-2 text-sm font-medium text-[#1f2a44] transition hover:bg-[#eef2f7]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-start gap-4 md:justify-end">
          {dataUser.isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-[#d9dde7] bg-white/80 px-5 py-3 text-sm font-semibold text-[#1f2a44] shadow-sm backdrop-blur transition hover:bg-white"
            >
              Salir
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
