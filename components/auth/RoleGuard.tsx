"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/services";
import type { AuthUser, UserRole } from "@/lib/api/types";

type RoleGuardProps = {
  allowedRoles: UserRole[];
  children: React.ReactNode;
};

const readStoredUser = (): AuthUser | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser =
    window.localStorage.getItem("vr_learn_user") ??
    window.localStorage.getItem("user");
    

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    return null;
  }
};

const hasDeveloperAccess = (user: AuthUser) =>
  user.role === "DEVELOPER" || Boolean(user.developerEnabled || user.developer);

const hasAllowedAccess = (user: AuthUser, roles: UserRole[]) =>
  roles.includes(user.role) ||
  (roles.includes("DEVELOPER") && hasDeveloperAccess(user));

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const allowedRoleKey = allowedRoles.join("|");
  const [status, setStatus] = useState<"loading" | "allowed" | "denied">(
    "loading",
  );

  useEffect(() => {
    let isMounted = true;
    const roles = allowedRoleKey.split("|") as UserRole[];

    const checkAccess = async () => {
      try {
        const user = await authApi.me();

        if (!isMounted) {
          return;
        }

        if (typeof window !== "undefined") {
          window.localStorage.setItem("vr_learn_user", JSON.stringify(user));
        }

        setStatus(hasAllowedAccess(user, roles) ? "allowed" : "denied");
      } catch {
        const storedUser = readStoredUser();

        if (!isMounted) {
          return;
        }

        setStatus(
          storedUser && hasAllowedAccess(storedUser, roles)
            ? "allowed"
            : "denied",
        );
      }
    };

    void checkAccess();

    return () => {
      isMounted = false;
    };
  }, [allowedRoleKey]);

  useEffect(() => {
    if (status === "denied") {
      router.replace("/");
    }
  }, [router, status]);

  if (status === "allowed") {
    return <>{children}</>;
  }

  return (
    <main className="instructor-dashboard-page">
      <section className="instructor-card">
        <h1 className="instructor-dashboard-title">Checking access</h1>
        <p className="instructor-dashboard-subtitle">
          Please wait while your account permissions are verified.
        </p>
      </section>
    </main>
  );
}
