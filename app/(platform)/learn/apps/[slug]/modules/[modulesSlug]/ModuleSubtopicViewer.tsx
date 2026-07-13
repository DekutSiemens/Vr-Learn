"use client";

import { useState } from "react";

export type Subtopic = {
  id: string;
  title: string;
  description: string;
  type: "video" | "document" | "note";
  duration: string;
  content: string;
  status?: "Completed" | "In Progress" | "Not Started";
  notes?: string;
  resources?: string[];
};

type ModuleSubtopicViewerProps = {
  subtopics: Subtopic[];
  onCompleteLesson?: (lessonId: string) => Promise<void>;
};

export default function ModuleSubtopicViewer({
  subtopics,
  onCompleteLesson,
}: ModuleSubtopicViewerProps) {
  const [activeSubtopicId, setActiveSubtopicId] = useState(subtopics[0]?.id ?? "");
  const [completingLessonId, setCompletingLessonId] = useState("");

  const activeSubtopic =
    subtopics.find((subtopic) => subtopic.id === activeSubtopicId) ??
    subtopics[0];

  if (!activeSubtopic) {
    return null;
  }

  const handleComplete = async () => {
    if (!onCompleteLesson) return;

    setCompletingLessonId(activeSubtopic.id);
    try {
      await onCompleteLesson(activeSubtopic.id);
    } finally {
      setCompletingLessonId("");
    }
  };

  return (
    <section className="learning-module-workspace">
      <aside className="learning-module-sidebar" aria-label="Module subtopics">
        <h2 className="learning-module-section-title">Subtopics</h2>

        <div className="learning-module-subtopic-list">
          {subtopics.map((subtopic, index) => {
            const isActive = subtopic.id === activeSubtopic.id;

            return (
              <button
                key={subtopic.id}
                type="button"
                className={`learning-module-subtopic-button ${
                  isActive ? "learning-module-subtopic-button-active" : ""
                }`}
                onClick={() => setActiveSubtopicId(subtopic.id)}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="learning-module-subtopic-order">
                  {index + 1}
                </span>
                <span>
                  <span className="learning-module-subtopic-title">
                    {subtopic.title}
                  </span>
                  <span className="learning-module-subtopic-meta">
                    {subtopic.type} · {subtopic.duration}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <article className="learning-module-content-card">
        <div className="learning-module-content-header">
          <div>
            <p className="learning-module-lesson-label">
              {activeSubtopic.type} lesson
            </p>
            <h2 className="learning-module-content-title">
              {activeSubtopic.title}
            </h2>
            <p className="learning-module-lesson-description">
              {activeSubtopic.description}
            </p>
          </div>

          <div className="learning-module-tags">
            <span className="learning-module-tag">{activeSubtopic.type}</span>
            <span className="learning-module-tag">{activeSubtopic.duration}</span>
            {activeSubtopic.status ? (
              <span className="learning-module-tag">{activeSubtopic.status}</span>
            ) : null}
          </div>
        </div>

        <div className="learning-module-media-panel">
          <p className="learning-module-media-type">
            {activeSubtopic.type === "video"
              ? "Video lesson"
              : activeSubtopic.type === "document"
              ? "Document lesson"
              : "Lesson notes"}
          </p>
          <p>{activeSubtopic.content}</p>
        </div>

        {activeSubtopic.notes ? (
          <section className="learning-module-notes-card">
            <h3>Notes</h3>
            <p>{activeSubtopic.notes}</p>
          </section>
        ) : null}

        {activeSubtopic.resources && activeSubtopic.resources.length > 0 ? (
          <section className="learning-module-resources-card">
            <h3>Resources</h3>
            <ul>
              {activeSubtopic.resources.map((resource) => (
                <li key={resource}>{resource}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {onCompleteLesson ? (
          <button
            type="button"
            className="learning-module-complete-btn"
            onClick={handleComplete}
            disabled={
              activeSubtopic.status === "Completed" ||
              completingLessonId === activeSubtopic.id
            }
          >
            {activeSubtopic.status === "Completed"
              ? "Lesson Completed"
              : completingLessonId === activeSubtopic.id
                ? "Saving..."
                : "Mark Lesson Complete"}
          </button>
        ) : null}
      </article>
    </section>
  );
}
