"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { instructorAppsApi } from "@/lib/api/services";
import type { LearningApp } from "@/lib/api/types";
import useCurrentUser, {
  getUserFirstName,
} from "@/components/auth/useCurrentUser";

export default function InstructorDashboard() {
  const user = useCurrentUser();
  const [apps, setApps] = useState<LearningApp[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApps = async () => {
      setIsLoading(true);
      setError("");

      try {
        setApps(await instructorAppsApi.list());
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load instructor apps.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadApps();
  }, []);

  const totals = useMemo(
    () => ({
      modules: apps.reduce((total, app) => total + app.modules, 0),
      lessons: apps.reduce((total, app) => total + app.lessons, 0),
      published: apps.filter((app) =>
        ["Published", "Active"].includes(app.status),
      ).length,
      draft: apps.filter((app) => app.status === "Draft").length,
    }),
    [apps],
  );

  const stats = [
    { label: "Assigned Apps", value: apps.length },
    { label: "Total Modules", value: totals.modules },
    { label: "Total Lessons", value: totals.lessons },
    { label: "Draft Apps", value: totals.draft },
    { label: "Published Apps", value: totals.published },
  ];

  const normalizedQuery = query.trim().toLowerCase();
  const filteredApps = apps.filter(
    (app) =>
      !normalizedQuery ||
      [app.title, app.description, app.status]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
  );
  const firstName = getUserFirstName(user, "Instructor");

  return (
    <div className="instructor-dashboard-page">
      <header className="instructor-dashboard-header">
        <div>
          <h1 className="instructor-dashboard-title">Instructor Dashboard</h1>
          <p className="instructor-dashboard-subtitle">
            Manage modules and lessons for apps you uploaded on the Store
          </p>
        </div>

        <div className="instructor-dashboard-header-actions">
          <input
            type="text"
            placeholder="Search apps..."
            className="instructor-dashboard-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search instructor apps"
          />
          {/* <span className="instructor-dashboard-user-name">{firstName}</span> */}
          <div className="instructor-dashboard-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {error && <p className="instructor-error-message">{error}</p>}
      {isLoading && <p className="instructor-muted-message">Loading dashboard...</p>}

      <section className="instructor-stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="instructor-stat-card">
            <p className="instructor-stat-label">{stat.label}</p>
            <h2 className="instructor-stat-value">{stat.value}</h2>
          </div>
        ))}
      </section>

      <section className="instructor-card">
        <h2 className="instructor-section-title">Quick Actions</h2>

        <div className="instructor-quick-actions">
          <Link href="/instructor/apps" className="instructor-primary-btn">
            Manage Uploaded Apps
          </Link>

          <Link href="/instructor/resources" className="instructor-secondary-btn">
            Upload Resource
          </Link>
        </div>
      </section>

      <section className="instructor-section">
        <h2 className="instructor-section-title">Uploaded Store Apps</h2>

        {!isLoading && !error && filteredApps.length === 0 && (
          <p className="instructor-muted-message">
            {query
              ? `No apps match “${query.trim()}”.`
              : "No Store uploads found for this developer account."}
          </p>
        )}

        <div className="instructor-apps-grid">
          {filteredApps.slice(0, 3).map((app) => {
            const imageUrl = app.iconUrl || app.heroImageUrl;

            return (
              <div key={app.id} className="instructor-app-card">
                <div className="instructor-app-image">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`${app.title} icon`}
                      width={320}
                      height={160}
                      unoptimized
                    />
                  ) : null}
                </div>

                <h3 className="instructor-app-title">{app.title}</h3>

                <p className="instructor-app-meta">
                  {app.modules} modules - {app.learnersCount} {app.learnersCount === 1 ? "learner" : "learners"}
                </p>

                <span className="instructor-app-status">{app.status}</span>

                <Link
                  href={`/instructor/apps/${app.id}`}
                  className="instructor-primary-btn instructor-app-btn"
                >
                  Manage App
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
