"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function AuthProvider({ children }) {
  const refreshToken = useAuthStore((state) => state.refreshToken);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  return <>{children}</>;
}
