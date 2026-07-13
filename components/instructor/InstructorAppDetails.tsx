"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  instructorAppsApi,
  instructorModulesApi,
} from "@/lib/api/services";
import type { LearningApp, LearningModule } from "@/lib/api/types";

type InstructorAppDetailsProps = {
  appId: string;
};

export default function InstructorAppDetails({ appId }: InstructorAppDetailsProps) {
  const [app, setApp] = useState<LearningApp | null>(null);
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    setError("");

    try {
      const [loadedApp, loadedModules] = await Promise.all([
        instructorAppsApi.get(appId),
        instructorModulesApi.list(appId),
      ]);
      setApp(loadedApp);
      setModules(loadedModules);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load app.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    Promise.all([instructorAppsApi.get(appId), instructorModulesApi.list(appId)])
      .then(([loadedApp, loadedModules]) => {
        if (isMounted) {
          setApp(loadedApp);
          setModules(loadedModules);
        }
      })
      .catch((requestError: unknown) => {
        if (isMounted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load app.",
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [appId]);

  const handleDeleteModule = async (moduleId: string) => {
    if (!confirm("Delete this module and its lessons?")) {
      return;
    }

    await instructorModulesApi.delete(moduleId);
    await loadData();
  };

  if (isLoading) {
    return <p className="instructor-muted-message">Loading app...</p>;
  }

  if (error) {
    return <p className="instructor-error-message">{error}</p>;
  }

  if (!app) {
    return <p className="instructor-muted-message">App not found.</p>;
  }

  return (
    <div className="instructor-single-app-page">
      <section className="instructor-single-app-hero">
        <div className="instructor-single-app-hero-layout">
          <div>
            <h1 className="instructor-single-app-title">{app.title}</h1>

            <p className="instructor-single-app-subtitle">
              {app.description || "Manage modules and lessons for this Store app."}
            </p>
          </div>

          <div className="instructor-single-app-actions">
            <Link
              href={`/instructor/apps/${appId}/modules/new`}
              className="instructor-single-app-primary-btn"
            >
              Add Module
            </Link>

          </div>
        </div>
      </section>

      <section className="instructor-single-app-stats-grid">
        <div className="instructor-single-app-stat-card">
          <p className="instructor-single-app-stat-label">Modules</p>
          <h2 className="instructor-single-app-stat-value">{modules.length}</h2>
        </div>

        <div className="instructor-single-app-stat-card">
          <p className="instructor-single-app-stat-label">Lessons</p>
          <h2 className="instructor-single-app-stat-value">
            {modules.reduce((total, module) => total + module.lessons, 0)}
          </h2>
        </div>

        <div className="instructor-single-app-stat-card">
          <p className="instructor-single-app-stat-label">Status</p>
          <h2 className="instructor-single-app-stat-value">{app.status}</h2>
        </div>
      </section>

      <section className="instructor-single-app-section">
        <h2 className="instructor-single-app-section-title">Modules</h2>

        {modules.length === 0 && (
          <p className="instructor-muted-message">No modules created yet.</p>
        )}

        <div className="instructor-single-app-modules-list">
          {modules.map((module) => (
            <div key={module.id} className="instructor-single-app-module-card">
              <div className="instructor-single-app-module-layout">
                <div>
                  <p className="instructor-single-app-module-order">
                    Order {module.order}
                  </p>

                  <h3 className="instructor-single-app-module-title">
                    {module.title}
                  </h3>

                  <p className="instructor-single-app-module-description">
                    {module.description}
                  </p>

                  <p className="instructor-single-app-module-lessons">
                    {module.lessons} lessons
                  </p>

                  <span className="instructor-single-app-module-status">
                    {module.status}
                  </span>
                </div>

                <div className="instructor-single-app-module-actions">
                  <Link
                    href={`/instructor/apps/${appId}/modules/${module.id}/lessons`}
                    className="instructor-single-app-primary-btn"
                  >
                    Open Module
                  </Link>

                  <Link
                    href={`/instructor/apps/${appId}/modules/${module.id}/edit`}
                    className="instructor-single-app-secondary-btn"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    className="instructor-single-app-danger-btn"
                    onClick={() => handleDeleteModule(module.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
