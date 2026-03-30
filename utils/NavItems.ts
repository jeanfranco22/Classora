import { NavItem } from "@/Interface/NavItem";

export const navItems: NavItem[] = [
  { label: "Inicio", href: "/", position: "left" },
  { label: "Acerca De", href: "/about", position: "left" },

  { label: "Lecciones", href: "/lessons", position: "center" },
  { label: "Reservas", href: "/booking", position: "center" },

  { label: "Iniciar Sesion", href: "/login", position: "right" },
  { label: "Registro", href: "/register", position: "right" },
];
