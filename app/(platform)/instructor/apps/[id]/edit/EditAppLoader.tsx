"use client";

import { useEffect, useState } from "react";
import AppForm from "@/components/instructor/AppForm";
import { instructorAppsApi } from "@/lib/api/services";
import type { LearningApp } from "@/lib/api/types";

type EditAppLoaderProps = {
  appId: string;
};

export default function EditAppLoader({ appId }: EditAppLoaderProps) {
  const [app, setApp] = useState<LearningApp | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApp = async () => {
      try {
        setApp(await instructorAppsApi.get(appId));
      } catch (requestError) {
        setError(
          requestError instanceof Error ? requestError.message : "Unable to load app.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadApp();
  }, [appId]);

  if (isLoading) {
    return <p className="instructor-muted-message">Loading app...</p>;
  }

  if (error) {
    return <p className="instructor-error-message">{error}</p>;
  }

  return app ? <AppForm app={app} /> : null;
}
