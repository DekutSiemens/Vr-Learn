import Link from "next/link";
import "@/styles/module.css";
import ModuleSubtopicViewer, { type Subtopic } from "./ModuleSubtopicViewer";

type PageProps = {
  params: Promise<{ slug: string; modulesSlug: string }>;
};

const subtopics: Subtopic[] = [
  {
    id: "introduction",
    title: "Introduction to the pH Meter",
    description: "Understand the parts and role of the pH meter.",
    type: "video",
    duration: "6 min",
    status: "Completed",
    content:
      "Learn what a pH meter measures, how the electrode senses hydrogen ion activity, and why stable readings matter before any experiment begins.",
    notes:
      "Check that the probe is clean, hydrated, and connected before starting the lesson.",
    resources: ["pH meter parts diagram", "Electrode handling checklist"],
  },
  {
    id: "prepare-buffer",
    title: "Prepare the Buffer Solution",
    description: "Set up the right solution for calibration.",
    type: "document",
    duration: "8 min",
    status: "In Progress",
    content:
      "Prepare the calibration buffer by selecting the correct pH standard, pouring enough solution into a clean beaker, and avoiding contamination from previous samples.",
    notes:
      "Use fresh buffer solution and never pour used buffer back into the stock bottle.",
    resources: ["Buffer preparation worksheet", "Calibration safety notes"],
  },
  {
    id: "calibrate-meter",
    title: "Calibrate the Meter",
    description: "Perform accurate calibration step by step.",
    type: "note",
    duration: "10 min",
    status: "Not Started",
    content:
      "Calibrate the meter using the prepared buffer, wait for readings to stabilize, confirm the calibration point, and rinse the probe between solutions.",
    notes:
      "Stable calibration is required before measuring unknown samples.",
    resources: ["Calibration sequence guide", "Troubleshooting unstable readings"],
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
          <span>1 of {subtopics.length} lessons completed</span>
          <span>38%</span>
        </div>

        <div className="learning-module-progress-track">
          <div className="learning-module-progress-fill" />
        </div>
      </section>

      <ModuleSubtopicViewer subtopics={subtopics} />
    </div>
  );
}
