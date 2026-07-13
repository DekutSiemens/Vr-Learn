"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { instructorModulesApi } from "@/lib/api/services";
import type { LearningModule, ModulePayload } from "@/lib/api/types";

type ModuleFormProps = {
  appId: string;
  module?: LearningModule;
};

export default function ModuleForm({ appId, module }: ModuleFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(module?.title ?? "");
  const [description, setDescription] = useState(module?.description ?? "");
  const [order, setOrder] = useState(String(module?.order ?? ""));
  const [status, setStatus] = useState(module?.status ?? "Draft");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    const payload: ModulePayload = {
      title: title.trim(),
      description: description.trim(),
      order: order ? Number(order) : undefined,
      status,
    };

    setIsSubmitting(true);

    try {
      await (module
        ? instructorModulesApi.update(module.id, payload)
        : instructorModulesApi.create(appId, payload));
      router.refresh();
      router.push(`/instructor/apps/${appId}`);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to save module.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="instructor-card instructor-form" onSubmit={handleSubmit}>
      <h2 className="instructor-section-title">
        {module ? "Edit Module" : "Create Module"}
      </h2>

      <p className="instructor-dashboard-subtitle">
        Add learner-facing modules to this backend app.
      </p>

      {error && <p className="instructor-error-message">{error}</p>}

      <label className="instructor-form-field">
        <span>Title</span>
        <input
          className="instructor-dashboard-search"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Module title"
        />
      </label>

      <label className="instructor-form-field">
        <span>Description</span>
        <textarea
          className="instructor-textarea"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What this module teaches"
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
          {isSubmitting ? "Saving..." : "Save Module"}
        </button>
      </div>
    </form>
  );
}
