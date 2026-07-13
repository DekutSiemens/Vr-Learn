"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { learnerProgressApi, publicAppsApi } from "@/lib/api/services";
import type { LearningLesson, LearningModule } from "@/lib/api/types";
import ModuleSubtopicViewer, {
  type Subtopic,
} from "@/app/(platform)/learn/apps/[slug]/modules/[modulesSlug]/ModuleSubtopicViewer";

type LearnerModuleDetailsProps = {
  slug: string;
  moduleId: string;
};

export default function LearnerModuleDetails({
  slug,
  moduleId,
}: LearnerModuleDetailsProps) {
  const [module, setModule] = useState<LearningModule | null>(null);
  const [lessons, setLessons] = useState<LearningLesson[]>([]);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadModule = async () => {
      const [loadedModule, loadedLessons, loadedCompletedLessonIds] = await Promise.all([
        publicAppsApi.getModule(moduleId),
        publicAppsApi.listLessons(moduleId),
        learnerProgressApi.listCompletedLessons(moduleId),
      ]);
      setModule(loadedModule ?? null);
      setLessons(loadedLessons);
      setCompletedLessonIds(loadedCompletedLessonIds);
      setIsLoading(false);
    };

    void loadModule();
  }, [moduleId]);

  const subtopics = useMemo<Subtopic[]>(
    () =>
      lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        type: lesson.videoUrl ? "video" : lesson.documentUrl ? "document" : "note",
        duration: "Self paced",
        status: completedLessonIds.includes(lesson.id)
          ? "Completed"
          : "Not Started",
        content: lesson.content || lesson.description,
        notes: lesson.description,
        videoUrl: lesson.videoUrl,
        documentUrl: lesson.documentUrl,
        resources: [lesson.videoUrl, lesson.documentUrl].filter(Boolean) as string[],
      })),
    [completedLessonIds, lessons],
  );

  const progressPercent = lessons.length > 0
    ? Math.round((completedLessonIds.length / lessons.length) * 100)
    : 0;

  const handleCompleteLesson = async (lessonId: string) => {
    await learnerProgressApi.completeLesson(lessonId);
    setCompletedLessonIds((current) =>
      current.includes(lessonId) ? current : [...current, lessonId],
    );
  };

  if (isLoading) {
    return <p className="instructor-muted-message">Loading module...</p>;
  }

  if (!module) {
    return <p className="instructor-muted-message">Module not found.</p>;
  }

  return (
    <div className="learning-module-page">
      <div className="learning-module-breadcrumbs">
        <Link href="/learn/courses" className="learning-module-breadcrumb-link">
          Learn
        </Link>
        <span>/</span>
        <Link
          href={`/learn/apps/${slug}`}
          className="learning-module-breadcrumb-link"
        >
          Course
        </Link>
        <span>/</span>
        <span>Module</span>
      </div>

      <section className="learning-module-hero">
        <h1 className="learning-module-title">{module.title}</h1>

        <p className="learning-module-description">{module.description}</p>

        <div className="learning-module-meta">
          <span>Total lessons: {lessons.length}</span>
          <span>Status: {module.status}</span>
        </div>
      </section>

      <section className="learning-module-progress-card">
        <div className="learning-module-progress-header">
          <span>Read-only learner view</span>
          <span>
            {completedLessonIds.length} of {lessons.length} lessons complete
          </span>
        </div>

        <div className="learning-module-progress-track">
          <div
            className="learning-module-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {subtopics.length > 0 ? (
        <ModuleSubtopicViewer
          subtopics={subtopics}
          onCompleteLesson={handleCompleteLesson}
        />
      ) : (
        <section className="learning-module-content-card">
          <h2 className="learning-module-content-title">No lessons available</h2>
          <p className="learning-module-lesson-description">
            Lessons will appear here when they are added by an instructor.
          </p>
        </section>
      )}
    </div>
  );
}
