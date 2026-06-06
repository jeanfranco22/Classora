import { User } from "@/Interface/UserInterface";
import { DashboardShell } from "./DashboardShell";

export function StudentDashboard({ user }: { user: User }) {
  return (
    <DashboardShell
      user={user}
      eyebrow="Dashboard estudiante"
      title="Tu espacio de aprendizaje"
      description="Consulta lecciones, revisa tus reservas y mantén a mano tus datos de perfil para seguir avanzando en Classora."
      stats={[
        { label: "Rol", value: "Estudiante" },
        { label: "Reservas", value: "Mis clases" },
        { label: "Perfil", value: user.isProfileComplete ? "Completo" : "Pendiente" },
      ]}
      actions={[
        { label: "Ver lecciones", href: "/lessons" },
        { label: "Mis reservas", href: "/booking" },
        { label: "Perfil", href: "/dashboard" },
      ]}
    />
  );
}
