import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="auth-loading">
        <div className="loading-spinner" />
        <p>Loading...</p>
      </main>
    );
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
}