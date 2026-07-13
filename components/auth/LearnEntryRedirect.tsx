"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/services";
import type { AuthUser } from "@/lib/api/types";
import LearnDocumentation from "@/app/(platform)/learn/LearnDocumentation";

const hasDeveloperAccess = (user: AuthUser) =>
  user.role === "DEVELOPER" || Boolean(user.developerEnabled || user.developer);

export default function LearnEntryRedirect() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const redirectSignedInUser = async () => {
      try {
        const user = await authApi.me();

        if (!isMounted) {
          return;
        }

        window.localStorage.setItem("vr_learn_user", JSON.stringify(user));
        router.replace(hasDeveloperAccess(user) ? "/instructor" : "/learn");
      } catch {
        if (isMounted) {
          setCheckingAuth(false);
        }
      }
    };

    void redirectSignedInUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (checkingAuth) {
    return (
      <main className="instructor-dashboard-page">
        <section className="instructor-card">
          <h1 className="instructor-dashboard-title">Opening VR Learn</h1>
          <p className="instructor-dashboard-subtitle">
            Checking your Store session.
          </p>
        </section>
      </main>
    );
  }

  return <LearnDocumentation />;
}
