import React, { type JSX } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <div>Loading auth...</div>;
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;

  return children;
}
