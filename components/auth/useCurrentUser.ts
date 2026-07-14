"use client";

import { useEffect, useState } from "react";
import { authApi } from "@/lib/api/services";
import type { AuthUser } from "@/lib/api/types";

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

export const getUserFirstName = (user: AuthUser | null, fallback: string) =>
  user?.firstName?.trim() ||
  user?.name?.trim().split(/\s+/)[0] ||
  fallback;

export default function useCurrentUser() {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);

  useEffect(() => {
    let isMounted = true;

    authApi
      .me()
      .then((currentUser) => {
        if (isMounted) {
          window.localStorage.setItem(
            "vr_learn_user",
            JSON.stringify(currentUser),
          );
          setUser(currentUser);
        }
      })
      .catch(() => {
        if (isMounted) {
          setUser(readStoredUser());
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return user;
}
