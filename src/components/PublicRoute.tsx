import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({
  children,
}: PublicRouteProps) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return children;
}