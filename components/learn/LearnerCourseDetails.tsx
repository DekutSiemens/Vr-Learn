"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { publicAppsApi } from "@/lib/api/services";
import type { LearningApp, LearningModule } from "@/lib/api/types";

type LearnerCourseDetailsProps = {
  slug: string;
};

export default function LearnerCourseDetails({ slug }: LearnerCourseDetailsProps) {
  const [app, setApp] = useState<LearningApp | null>(null);
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      setIsLoading(true);
      setError("");

      try {
        const loadedApp = await publicAppsApi.get(slug);
        setApp(loadedApp);
        setModules(await publicAppsApi.listModules(slug));
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load course.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadCourse();
  }, [slug]);

  if (isLoading) {
    return <p className="instructor-muted-message">Loading course...</p>;
  }

  if (error) {
    return <p className="instructor-error-message">{error}</p>;
  }

  if (!app) {
    return <p className="instructor-muted-message">Course not found.</p>;
  }

  return (
    <div className="single-learning-app-page">
      <section className="single-learning-app-hero">
        <div className="single-learning-app-hero-image" />

        <div className="single-learning-app-hero-content">
          <p className="single-learning-app-label">Course</p>

          <h1 className="single-learning-app-title">{app.title}</h1>

          <p className="single-learning-app-description">{app.description}</p>

          <div className="single-learning-app-tags">
            <span className="single-learning-app-tag">{app.status}</span>
            <span className="single-learning-app-tag">
              {modules.length} modules
            </span>
          </div>
        </div>
      </section>

      <section className="single-learning-app-card">
        <h2 className="single-learning-app-section-title">About this Course</h2>
        <p className="single-learning-app-text">
          This read-only learner view shows published course details from the
          backend and module data from the pending module service boundary.
        </p>
      </section>

      <section className="single-learning-app-modules-section">
        <h2 className="single-learning-app-section-title">Modules</h2>

        {modules.length === 0 && (
          <p className="instructor-muted-message">No modules available yet.</p>
        )}

        <div className="single-learning-app-modules-grid">
          {modules.map((module) => (
            <div key={module.id} className="single-learning-app-module-card">
              <div className="single-learning-app-module-layout">
                <div>
                  <p className="single-learning-app-module-label">
                    Module {module.order}
                  </p>

                  <h3 className="single-learning-app-module-title">
                    {module.title}
                  </h3>

                  <p className="single-learning-app-module-description">
                    {module.description}
                  </p>

                  <p className="single-learning-app-module-lessons">
                    {module.lessons} lessons
                  </p>
                </div>

                <div className="single-learning-app-module-side">
                  <Link
                    href={`/learn/apps/${app.slug}/modules/${module.id}`}
                    className="single-learning-app-module-btn"
                  >
                    Open Module
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
