"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@store/authStore";
import { useHasRole } from "@lib/checkRole";

interface Props {
  children: React.ReactNode;
  roles: string[];
}

const Protected = ({ roles, children }: Props) => {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const hasRole = useHasRole(roles || []);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }
    if (roles && !hasRole) {
      router.replace("/no-access");
    }
  }, [token, roles, router, hasRole]);

  return <>{children}</>;
};

export default Protected;
