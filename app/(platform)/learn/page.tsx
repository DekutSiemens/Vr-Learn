"use client";

import "@/styles/learner.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { learnerProgressApi } from "@/lib/api/services";
import type { LearnerDashboard } from "@/lib/api/types";

export default function LearnDashboardPage() {
  const [dashboard, setDashboard] = useState<LearnerDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectingAppId, setSelectingAppId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true);
      setError("");

      try {
        setDashboard(await learnerProgressApi.dashboard());
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load learning dashboard.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  const learningApps = dashboard?.apps ?? [];
  const continueLearning = dashboard?.continueLearning ?? null;

  const dashboardStats = useMemo(
    () => [
      { label: "Published Apps", value: dashboard?.stats.availableApps ?? 0 },
      {
        label: "Chosen Apps",
        value: dashboard?.stats.selectedApps ?? 0,
      },
      {
        label: "Lessons Completed",
        value: dashboard?.stats.completedLessons ?? 0,
      },
      {
        label: "Overall Progress",
        value: `${dashboard?.stats.overallPercent ?? 0}%`,
      },
    ],
    [dashboard],
  );

  const handleChooseApp = async (appId: string) => {
    setSelectingAppId(appId);
    setError("");

    try {
      setDashboard(await learnerProgressApi.selectApp(appId));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to choose app.",
      );
    } finally {
      setSelectingAppId("");
    }
  };

  return (
    <div className="learn-page">
      <header className="learn-header">
        <div>
          <h1 className="learn-title">Learning Dashboard</h1>
          <p className="learn-subtitle">Welcome back, Learner</p>
        </div>

        <div className="learn-header-actions">
          <input
            type="text"
            placeholder="Search lessons, apps, or modules..."
            className="learn-search"
          />
          <div className="learn-avatar">D</div>
        </div>
      </header>

      <section className="stats-grid">
        {dashboardStats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <h2 className="stat-value">{stat.value}</h2>

            {stat.label === "Overall Progress" && (
              <div className="progress-track stat-progress-track">
                <div
                  className="progress-fill dark-fill"
                  style={{ width: `${dashboard?.stats.overallPercent ?? 0}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </section>

      {error && <p className="instructor-error-message">{error}</p>}

      <section className="section-card">
        <div className="section-head">
          <h2 className="section-title">Continue Learning</h2>
          {continueLearning ? (
            <Link href={continueLearning.resumeUrl} className="section-link">
              Resume Lesson
            </Link>
          ) : null}
        </div>

        {continueLearning ? (
          <div className="continue-grid">
            <div className="continue-image">
              {continueLearning.app.heroImageUrl || continueLearning.app.iconUrl ? (
                <Image
                  src={continueLearning.app.heroImageUrl || continueLearning.app.iconUrl || ""}
                  alt={continueLearning.app.title}
                  width={320}
                  height={180}
                  unoptimized
                />
              ) : null}
            </div>

            <div>
              <p className="muted-text">{continueLearning.app.title}</p>
              <h3 className="continue-title">
                {continueLearning.lesson?.title ??
                  (continueLearning.progress.complete ? "Course complete" : "Start learning")}
              </h3>
              {continueLearning.lesson ? (
                <p className="small-text">
                  Module: {continueLearning.lesson.moduleTitle}
                </p>
              ) : null}
              <p className="description-text">
                {continueLearning.lesson?.description ||
                  continueLearning.app.description}
              </p>

              <div className="progress-track">
                <div
                  className="progress-fill blue-fill"
                  style={{ width: `${continueLearning.progress.percent}%` }}
                />
              </div>

              <p className="small-text">
                {continueLearning.progress.completedLessons} of{" "}
                {continueLearning.progress.totalLessons} lessons complete (
                {continueLearning.progress.percent}%)
              </p>
            </div>
          </div>
        ) : (
          <p className="instructor-muted-message">
            Choose a published app below to start learning.
          </p>
        )}
      </section>

      <section className="learn-section">
        <div className="section-head">
          <h2 className="section-title">Published Apps</h2>
          <Link href="/learn/apps" className="section-link">
            Browse all
          </Link>
        </div>

        <div className="apps-grid">
          {isLoading && (
            <p className="instructor-muted-message">Loading apps...</p>
          )}
          {!isLoading && !error && learningApps.length === 0 && (
            <p className="instructor-muted-message">No published apps found.</p>
          )}
          {learningApps.map((app) => {
            const progress = app.progress;
            const progressPercent = progress?.percent ?? 0;

            return (
              <div key={app.slug} className="app-card">
                <div className="app-image">
                  {app.iconUrl || app.heroImageUrl ? (
                    <Image
                      src={app.iconUrl || app.heroImageUrl || ""}
                      alt={app.title}
                      width={320}
                      height={180}
                      unoptimized
                    />
                  ) : null}
                </div>
                <h3 className="app-title">{app.title}</h3>
                <p className="app-description">{app.description}</p>
                <p className="small-text">
                  {app.modules} modules - {progress?.totalLessons ?? app.lessons} lessons
                </p>

                <div className="progress-track">
                  <div
                    className="progress-fill dark-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <p className="small-text">
                  {progress?.completedLessons ?? 0} lessons completed (
                  {progressPercent}%)
                </p>

                <div className="learn-app-actions">
                  <button
                    type="button"
                    className="open-app-btn"
                    onClick={() => handleChooseApp(app.id)}
                    disabled={selectingAppId === app.id}
                  >
                    {progress?.selected ? "Chosen" : selectingAppId === app.id ? "Choosing..." : "Choose App"}
                  </button>

                  <Link href={`/learn/apps/${app.slug}`} className="open-app-btn">
                    Open App
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
