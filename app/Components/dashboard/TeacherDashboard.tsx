import { User } from "@/Interface/UserInterface";
import { DashboardShell } from "./DashboardShell";

export function TeacherDashboard({ user }: { user: User }) {
  return (
    <DashboardShell
      user={user}
      eyebrow="Dashboard docente"
      title="Panel de gestión docente"
      description="Accede a tus clases, revisa reservas y entra al panel docente para preparar las próximas sesiones."
      stats={[
        { label: "Rol", value: "Docente" },
        { label: "Clases", value: "Mis clases" },
        { label: "Reservas", value: "Activas" },
      ]}
      actions={[
        { label: "Mis clases", href: "/lessons" },
        { label: "Reservas", href: "/booking" },
        { label: "Panel docente", href: "/teacher" },
      ]}
    />
  );
}
