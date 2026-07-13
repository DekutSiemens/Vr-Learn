"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { instructorLessonsApi } from "@/lib/api/services";
import type { LearningLesson } from "@/lib/api/types";

type InstructorLessonsListProps = {
  appId: string;
  moduleId: string;
};

export default function InstructorLessonsList({
  appId,
  moduleId,
}: InstructorLessonsListProps) {
  const [lessons, setLessons] = useState<LearningLesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLessons = async () => {
    setIsLoading(true);
    setError("");

    try {
      setLessons(await instructorLessonsApi.list(moduleId));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load lessons.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    instructorLessonsApi
      .list(moduleId)
      .then((loadedLessons) => {
        if (isMounted) {
          setLessons(loadedLessons);
        }
      })
      .catch((requestError: unknown) => {
        if (isMounted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load lessons.",
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
  }, [moduleId]);

  const handleDelete = async (lessonId: string) => {
    if (!confirm("Delete this lesson?")) {
      return;
    }

    await instructorLessonsApi.delete(lessonId);
    await loadLessons();
  };

  return (
    <div className="instructor-module-page">
      <div className="instructor-module-breadcrumbs">
        <Link href="/instructor" className="instructor-module-breadcrumb-link">
          Instructor
        </Link>
        <span>/</span>
        <Link
          href={`/instructor/apps/${appId}`}
          className="instructor-module-breadcrumb-link"
        >
          App
        </Link>
        <span>/</span>
        <span className="instructor-module-breadcrumb-current">Lessons</span>
      </div>

      <section className="instructor-module-hero">
        <div className="instructor-module-hero-layout">
          <div>
            <h1 className="instructor-module-title">Lessons</h1>

            <p className="instructor-module-subtitle">
              Manage lesson content inside this module.
            </p>

            <p className="instructor-module-meta">
              Lesson count: {lessons.length}
            </p>
          </div>

          <Link
            href={`/instructor/apps/${appId}/modules/${moduleId}/lessons/new`}
            className="instructor-module-primary-btn"
          >
            Add Lesson
          </Link>
        </div>
      </section>

      <section className="instructor-module-table-card">
        <h2 className="instructor-module-section-title">Lessons</h2>
        <p className="instructor-dashboard-subtitle">
          Lessons are saved to the backend and shown to learners from the same module.
        </p>

        {isLoading && <p className="instructor-muted-message">Loading lessons...</p>}
        {error && <p className="instructor-error-message">{error}</p>}
        {!isLoading && !error && lessons.length === 0 && (
          <p className="instructor-muted-message">No lessons created yet.</p>
        )}

        <div className="instructor-module-table-wrapper">
          <table className="instructor-module-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Status</th>
                <th>Video</th>
                <th>Documents</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson.id}>
                  <td>{lesson.order}</td>
                  <td className="instructor-module-table-strong">
                    {lesson.title}
                  </td>
                  <td>
                    <span
                      className={
                        lesson.status === "Published"
                          ? "instructor-module-status instructor-module-status-published"
                          : "instructor-module-status instructor-module-status-draft"
                      }
                    >
                      {lesson.status}
                    </span>
                  </td>
                  <td>{lesson.videoUrl ? "Yes" : "No"}</td>
                  <td>{lesson.documentUrl ? "Yes" : "No"}</td>
                  <td>
                    <div className="instructor-module-actions">
                      <Link
                        href={`/instructor/apps/${appId}/modules/${moduleId}/lessons/${lesson.id}/edit`}
                        className="instructor-module-action-link instructor-module-action-edit"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="instructor-module-action-link instructor-module-action-delete"
                        onClick={() => handleDelete(lesson.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
