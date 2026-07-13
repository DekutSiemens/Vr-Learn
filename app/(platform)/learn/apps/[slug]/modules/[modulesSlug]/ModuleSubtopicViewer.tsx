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
  videoUrl?: string;
  documentUrl?: string;
  resources?: string[];
};

type ModuleSubtopicViewerProps = {
  subtopics: Subtopic[];
  onCompleteLesson?: (lessonId: string) => Promise<void>;
};

type VideoSource =
  | { kind: "video"; url: string }
  | { kind: "embed"; url: string }
  | null;

const directVideoPattern = /\.(mp4|webm|ogg|mov)(\?.*)?$/i;

function getSafeHttpUrl(url: string | undefined) {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:"
      ? parsedUrl
      : null;
  } catch {
    return null;
  }
}

function getYouTubeId(url: URL) {
  if (url.hostname.includes("youtu.be")) {
    return url.pathname.split("/").filter(Boolean)[0] ?? null;
  }

  if (url.hostname.includes("youtube.com")) {
    if (url.pathname.startsWith("/watch")) {
      return url.searchParams.get("v");
    }

    if (url.pathname.startsWith("/shorts/") || url.pathname.startsWith("/embed/")) {
      return url.pathname.split("/").filter(Boolean)[1] ?? null;
    }
  }

  return null;
}

function getVideoSource(url: string | undefined): VideoSource {
  const safeUrl = getSafeHttpUrl(url);
  if (!safeUrl) {
    return null;
  }

  const youtubeId = getYouTubeId(safeUrl);
  if (youtubeId) {
    return {
      kind: "embed",
      url: `https://www.youtube.com/embed/${youtubeId}`,
    };
  }

  if (safeUrl.hostname.includes("vimeo.com")) {
    const videoId = safeUrl.pathname.split("/").filter(Boolean)[0];
    if (videoId) {
      return {
        kind: "embed",
        url: `https://player.vimeo.com/video/${videoId}`,
      };
    }
  }

  if (directVideoPattern.test(safeUrl.href)) {
    return { kind: "video", url: safeUrl.href };
  }

  return { kind: "embed", url: safeUrl.href };
}

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

  const videoSource = getVideoSource(activeSubtopic.videoUrl);
  const safeVideoUrl = getSafeHttpUrl(activeSubtopic.videoUrl)?.href;

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
          {videoSource ? (
            <div className="learning-module-video-shell">
              {videoSource.kind === "video" ? (
                <video
                  className="learning-module-video"
                  src={videoSource.url}
                  controls
                  preload="metadata"
                >
                  Your browser does not support the video player.
                </video>
              ) : (
                <iframe
                  className="learning-module-video"
                  src={videoSource.url}
                  title={`${activeSubtopic.title} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              )}
            </div>
          ) : null}
          <p>{activeSubtopic.content}</p>
          {safeVideoUrl ? (
            <a
              className="learning-module-video-link"
              href={safeVideoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open video in a new tab
            </a>
          ) : activeSubtopic.videoUrl ? (
            <p className="learning-module-video-warning">
              This lesson has a video URL, but it is not a valid http or https link.
            </p>
          ) : null}
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
              {activeSubtopic.resources.map((resource) => {
                const safeResourceUrl = getSafeHttpUrl(resource)?.href;

                return (
                  <li key={resource}>
                    {safeResourceUrl ? (
                      <a href={safeResourceUrl} target="_blank" rel="noreferrer">
                        {resource}
                      </a>
                    ) : (
                      resource
                    )}
                  </li>
                );
              })}
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
