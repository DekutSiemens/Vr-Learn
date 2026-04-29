import Link from "next/link";
import "@/styles/module.css";

type PageProps = {
  params: Promise<{ slug: string; modulesSlug: string }>;
};

const lessons = [
  {
    order: 1,
    title: "Introduction to the pH Meter",
    description: "Understand the parts and role of the pH meter.",
    type: "video",
    duration: "6 min",
    status: "Completed",
  },
  {
    order: 2,
    title: "Prepare the Buffer Solution",
    description: "Set up the right solution for calibration.",
    type: "document",
    duration: "8 min",
    status: "In Progress",
  },
  {
    order: 3,
    title: "Calibrate the Meter",
    description: "Perform accurate calibration step by step.",
    type: "note",
    duration: "10 min",
    status: "Not Started",
  },
];

export default async function LearningModulePage({ params }: PageProps) {
  const { slug, modulesSlug } = await params;

  return (
    <div className="learning-module-page">
      <div className="learning-module-breadcrumbs">
        <Link href="/learn" className="learning-module-breadcrumb-link">
          Learn
        </Link>
        <span>/</span>
        <Link
          href={`/learn/apps/${slug}`}
          className="learning-module-breadcrumb-link"
        >
          App
        </Link>
        <span>/</span>
        <span>Module</span>
      </div>

      <section className="learning-module-hero">
        <h1 className="learning-module-title">
          {modulesSlug.replace(/-/g, " ")}
        </h1>

        <p className="learning-module-description">
          Module description goes here. This module guides the learner through
          practical steps and lesson flow.
        </p>

        <div className="learning-module-meta">
          <span>Total lessons: 8</span>
          <span>Completion: 3/8</span>
        </div>
      </section>

      <section className="learning-module-progress-card">
        <div className="learning-module-progress-header">
          <span>3 of 8 lessons completed</span>
          <span>38%</span>
        </div>

        <div className="learning-module-progress-track">
          <div className="learning-module-progress-fill" />
        </div>
      </section>

      <section className="learning-module-lessons-section">
        <h2 className="learning-module-section-title">Lessons</h2>

        <div className="learning-module-lessons-list">
          {lessons.map((lesson) => (
            <div key={lesson.order} className="learning-module-lesson-card">
              <div className="learning-module-lesson-layout">
                <div>
                  <p className="learning-module-lesson-label">
                    Lesson {lesson.order}
                  </p>

                  <h3 className="learning-module-lesson-title">
                    {lesson.title}
                  </h3>

                  <p className="learning-module-lesson-description">
                    {lesson.description}
                  </p>

                  <div className="learning-module-tags">
                    <span className="learning-module-tag">{lesson.type}</span>
                    <span className="learning-module-tag">{lesson.duration}</span>
                    <span className="learning-module-tag">{lesson.status}</span>
                  </div>
                </div>

                <Link
                  href={`/learn/lessons/${lesson.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="learning-module-lesson-button"
                >
                  {lesson.status === "Completed"
                    ? "Review"
                    : lesson.status === "In Progress"
                    ? "Continue"
                    : "Start"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}