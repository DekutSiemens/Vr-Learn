"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { instructorAppsApi } from "@/lib/api/services";
import type { AppPayload, LearningApp } from "@/lib/api/types";

type AppFormProps = {
  app?: LearningApp;
};

export default function AppForm({ app }: AppFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(app?.title ?? "");
  const [description, setDescription] = useState(app?.description ?? "");
  const [status, setStatus] = useState(app?.status ?? "Draft");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    const payload: AppPayload = {
      title: title.trim(),
      description: description.trim(),
      status,
    };

    setIsSubmitting(true);

    try {
      const savedApp = app
        ? await instructorAppsApi.update(app.id, payload)
        : await instructorAppsApi.create(payload);

      setSuccess(app ? "App updated successfully." : "App created successfully.");
      router.refresh();
      router.push(`/instructor/apps/${savedApp.id || app?.id}`);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to save app.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="instructor-card instructor-form" onSubmit={handleSubmit}>
      <h2 className="instructor-section-title">
        {app ? "Edit App" : "Create App"}
      </h2>

      {error && <p className="instructor-error-message">{error}</p>}
      {success && <p className="instructor-success-message">{success}</p>}

      <label className="instructor-form-field">
        <span>Title</span>
        <input
          className="instructor-dashboard-search"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Course or app title"
        />
      </label>

      <label className="instructor-form-field">
        <span>Description</span>
        <textarea
          className="instructor-textarea"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe what learners will study"
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
          <option>Active</option>
          <option>Archived</option>
        </select>
      </label>

      <div className="instructor-quick-actions">
        <button
          type="submit"
          className="instructor-primary-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save App"}
        </button>
      </div>
    </form>
  );
}
