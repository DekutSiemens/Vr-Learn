"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { instructorLessonsApi } from "@/lib/api/services";
import type { LearningLesson, LessonPayload } from "@/lib/api/types";

type LessonFormProps = {
  appId: string;
  moduleId: string;
  lesson?: LearningLesson;
};

export default function LessonForm({ appId, moduleId, lesson }: LessonFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(lesson?.title ?? "");
  const [description, setDescription] = useState(lesson?.description ?? "");
  const [content, setContent] = useState(lesson?.content ?? "");
  const [videoUrl, setVideoUrl] = useState(lesson?.videoUrl ?? "");
  const [documentUrl, setDocumentUrl] = useState(lesson?.documentUrl ?? "");
  const [order, setOrder] = useState(String(lesson?.order ?? ""));
  const [status, setStatus] = useState(lesson?.status ?? "Draft");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    const payload: LessonPayload = {
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      videoUrl: videoUrl.trim(),
      documentUrl: documentUrl.trim(),
      order: order ? Number(order) : undefined,
      status,
    };

    setIsSubmitting(true);

    try {
      await (lesson
        ? instructorLessonsApi.update(lesson.id, payload)
        : instructorLessonsApi.create(moduleId, payload));
      router.refresh();
      router.push(
        `/instructor/apps/${appId}/modules/${moduleId}/lessons`,
      );
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to save lesson.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="instructor-card instructor-form" onSubmit={handleSubmit}>
      <h2 className="instructor-section-title">
        {lesson ? "Edit Lesson" : "Create Lesson"}
      </h2>

      <p className="instructor-dashboard-subtitle">
        Add lesson content to this backend module.
      </p>

      {error && <p className="instructor-error-message">{error}</p>}

      <label className="instructor-form-field">
        <span>Title</span>
        <input
          className="instructor-dashboard-search"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Lesson title"
        />
      </label>

      <label className="instructor-form-field">
        <span>Description</span>
        <textarea
          className="instructor-textarea"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Short learner-facing summary"
        />
      </label>

      <label className="instructor-form-field">
        <span>Lesson content</span>
        <textarea
          className="instructor-textarea instructor-textarea-large"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Notes, instructions, or documentation"
        />
      </label>

      <label className="instructor-form-field">
        <span>Video URL</span>
        <input
          className="instructor-dashboard-search"
          value={videoUrl}
          onChange={(event) => setVideoUrl(event.target.value)}
          placeholder="https://..."
        />
      </label>

      <label className="instructor-form-field">
        <span>Document URL</span>
        <input
          className="instructor-dashboard-search"
          value={documentUrl}
          onChange={(event) => setDocumentUrl(event.target.value)}
          placeholder="https://..."
        />
      </label>

      <label className="instructor-form-field">
        <span>Order</span>
        <input
          className="instructor-dashboard-search"
          type="number"
          min="1"
          value={order}
          onChange={(event) => setOrder(event.target.value)}
          placeholder="1"
        />
      </label>

      <label className="instructor-form-field">
        <span>Status</span>
        <select
          className="instructor-dashboard-search"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option>Draft</option>
          <option>Published</option>
        </select>
      </label>

      <div className="instructor-quick-actions">
        <button
          type="submit"
          className="instructor-primary-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Lesson"}
        </button>
      </div>
    </form>
  );
}
