"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetCurrentUser, useIsAuthenticated } from "@/app/data/hooks/useAuth";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardHeader from "./components/DashboardHeader";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useIsAuthenticated();
  const { user } = useGetCurrentUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user?.role === "admin") {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role === "admin") {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <DashboardHeader 
            onMenuClick={() => setSidebarOpen(true)}
            title="User Dashboard"
            subtitle={`Welcome back, ${user?.username}`}
          />
          
          <main className="p-4 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
