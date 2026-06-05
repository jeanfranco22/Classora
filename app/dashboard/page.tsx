"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AdminDashboard } from "../Components/dashboard/AdminDashboard";
import { StudentDashboard } from "../Components/dashboard/StudentDashboard";
import { TeacherDashboard } from "../Components/dashboard/TeacherDashboard";

export default function DashboardPage() {
  const router = useRouter();
  const { dataUser, getCurrentUser, initializing, logout } = useAuth();
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    if (initializing) return;

    if (!dataUser.isAuthenticated || !dataUser.token) {
      router.replace("/login");
      return;
    }

    if (dataUser.user) return;

    const loadUser = async () => {
      try {
        setLoadingUser(true);
        await getCurrentUser();
      } catch (error) {
        console.error(error);
        logout();
        router.replace("/login");
      } finally {
        setLoadingUser(false);
      }
    };

    void loadUser();
  }, [
    dataUser.isAuthenticated,
    dataUser.token,
    dataUser.user,
    getCurrentUser,
    initializing,
    logout,
    router,
  ]);

  if (initializing || loadingUser || (dataUser.isAuthenticated && !dataUser.user)) {
    return (
      <section className="min-h-screen bg-[#fffaf5] px-6 py-16 text-[#1d1d1d]">
        <div className="mx-auto max-w-6xl rounded-[28px] border border-[#eadfd3] bg-white p-6 text-sm text-[#6b625b] shadow-sm">
          Cargando dashboard...
        </div>
      </section>
    );
  }

  if (!dataUser.isAuthenticated || !dataUser.user) {
    return null;
  }

  if (dataUser.user.role === "admin") {
    return <AdminDashboard user={dataUser.user} />;
  }

  if (dataUser.user.role === "teacher") {
    return <TeacherDashboard user={dataUser.user} />;
  }

  return <StudentDashboard user={dataUser.user} />;
}
