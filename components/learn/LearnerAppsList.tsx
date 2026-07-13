"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { publicAppsApi } from "@/lib/api/services";
import type { LearningApp } from "@/lib/api/types";

export default function LearnerAppsList() {
  const [apps, setApps] = useState<LearningApp[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApps = async () => {
      setIsLoading(true);
      setError("");

      try {
        setApps(await publicAppsApi.list());
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load learning apps.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadApps();
  }, []);

  const filteredApps = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return apps;
    }

    return apps.filter((app) =>
      [app.title, app.description, app.status]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [apps, query]);

  return (
    <div className="learning-apps-page">
      <header className="learning-apps-header">
        <h1 className="learning-apps-title">Learning Apps</h1>
        <p className="learning-apps-subtitle">
          Browse available VR learning modules
        </p>
      </header>

      <section className="learning-apps-filters">
        <input
          placeholder="Search apps..."
          className="learning-apps-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <select className="learning-apps-select">
          <option>All</option>
          <option>Published</option>
        </select>

        <select className="learning-apps-select">
          <option>Recently Opened</option>
          <option>Alphabetical</option>
        </select>
      </section>

      {isLoading && <p className="instructor-muted-message">Loading apps...</p>}
      {error && <p className="instructor-error-message">{error}</p>}
      {!isLoading && !error && filteredApps.length === 0 && (
        <p className="instructor-muted-message">No published apps found.</p>
      )}

      <section className="learning-apps-grid">
        {filteredApps.map((app) => (
          <div key={app.id || app.slug} className="learning-app-card">
            <div className="learning-app-card-image" />

            <div className="learning-app-card-body">
              <h2 className="learning-app-card-title">{app.title}</h2>
              <p className="learning-app-card-description">{app.description}</p>

              <div className="learning-app-meta">
                <span>{app.modules} modules</span>
                <span>{app.lessons} lessons</span>
              </div>

              <Link
                href={`/learn/courses/${app.slug}`}
                className="learning-app-button"
              >
                View Modules
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
