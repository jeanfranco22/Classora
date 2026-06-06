import { User } from "@/Interface/UserInterface";
import { DashboardShell } from "./DashboardShell";

export function AdminDashboard({ user }: { user: User }) {
  return (
    <DashboardShell
      user={user}
      eyebrow="Dashboard admin"
      title="Administración de Classora"
      description="Centraliza la revisión de usuarios, clases y reservas desde una vista administrativa sin perder acceso a las rutas actuales."
      stats={[
        { label: "Rol", value: "Admin" },
        { label: "Usuarios", value: "Gestión" },
        { label: "Sistema", value: user.isActive ? "Activo" : "Inactivo" },
      ]}
      actions={[
        { label: "Usuarios", href: "/dashboard" },
        { label: "Clases", href: "/lessons" },
        { label: "Reservas", href: "/booking" },
        { label: "Admin", href: "/dashboard" },
      ]}
    />
  );
}
