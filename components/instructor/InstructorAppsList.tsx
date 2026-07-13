"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { instructorAppsApi } from "@/lib/api/services";
import type { LearningApp } from "@/lib/api/types";

export default function InstructorAppsList() {
  const [apps, setApps] = useState<LearningApp[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    instructorAppsApi
      .list()
      .then((loadedApps) => {
        if (isMounted) {
          setApps(loadedApps);
        }
      })
      .catch((requestError: unknown) => {
        if (isMounted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load apps.",
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
  }, []);

  const filteredApps = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return apps.filter((app) => {
      const matchesQuery =
        !normalizedQuery ||
        [app.title, app.description, app.status]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesStatus = status === "All Statuses" || app.status === status;

      return matchesQuery && matchesStatus;
    });
  }, [apps, query, status]);

  return (
    <div className="instructor-apps-page">
      <header className="instructor-apps-header">
        <h1 className="instructor-apps-title">My Apps</h1>
        <p className="instructor-apps-subtitle">
          Choose one of your uploaded Store apps to add modules and lessons
        </p>
      </header>

      <section className="instructor-apps-filters">
        <input
          placeholder="Search apps..."
          className="instructor-apps-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <select
          className="instructor-apps-select"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option>All Statuses</option>
          <option>Active</option>
          <option>Draft</option>
          <option>Published</option>
          <option>Archived</option>
        </select>

      </section>

      {isLoading && <p className="instructor-muted-message">Loading apps...</p>}
      {error && <p className="instructor-error-message">{error}</p>}
      {!isLoading && !error && filteredApps.length === 0 && (
        <p className="instructor-muted-message">
          No uploaded Store apps found for this developer account.
        </p>
      )}

      <section className="instructor-apps-grid">
        {filteredApps.map((app) => {
          const imageUrl = app.iconUrl || app.heroImageUrl;

          return (
            <div key={app.id} className="instructor-apps-card">
              <div className="instructor-apps-card-image">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={`${app.title} icon`}
                    width={360}
                    height={176}
                    unoptimized
                  />
                ) : null}
              </div>

              <div className="instructor-apps-card-body">
                <h2 className="instructor-apps-card-title">{app.title}</h2>

                <p className="instructor-apps-card-description">
                  {app.description}
                </p>

                <p className="instructor-apps-card-meta">
                  {app.modules} modules - {app.lessons} lessons
                </p>

                <span className="instructor-apps-status-badge">
                  {app.status}
                </span>

                <Link
                  href={`/instructor/apps/${app.id}`}
                  className="instructor-apps-button"
                >
                  Manage App
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
