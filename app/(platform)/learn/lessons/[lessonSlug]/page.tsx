import Link from "next/link";
import "@/styles/lesson.css";

type PageProps = {
  params: Promise<{ lessonSlug: string }>;
};

const lessonList = [
  "Introduction to the pH Meter",
  "Prepare the Buffer Solution",
  "Calibrate the Meter",
  "Run the Sample Test",
];

const resources = [
  { name: "Calibration Guide.pdf", type: "PDF" },
  { name: "Lab Worksheet.docx", type: "DOCX" },
];

export default async function LessonPage({ params }: PageProps) {
  const { lessonSlug } = await params;

  return (
    <div className="lesson-page">
      <div className="lesson-breadcrumbs">
        <Link href="/learn" className="lesson-breadcrumb-link">
          Learn
        </Link>
        <span>/</span>
        <Link href="/learn/apps/fluid-power-vr" className="lesson-breadcrumb-link">
        VR Fluid Power System
        </Link>
        <span>/</span>
        <span>Lesson</span>
      </div>

      <section className="lesson-header-card">
        <div className="lesson-header-layout">
          <div>
            <h1 className="lesson-title">
              {lessonSlug.replace(/-/g, " ")}
            </h1>
            <p className="lesson-subtitle">
              Module: pH Test Module • Estimated time: 10 min
            </p>
          </div>

          <span className="lesson-status-badge">In Progress</span>
        </div>
      </section>

      <div className="lesson-main-grid">
        <aside className="lesson-sidebar-card">
          <h2 className="lesson-card-title">Module Lessons</h2>

          <div className="lesson-list">
            {lessonList.map((lesson) => {
              const slug = lesson.toLowerCase().replace(/\s+/g, "-");
              const active = slug === lessonSlug;

              return (
                <Link
                  key={lesson}
                  href={`/learn/lessons/${slug}`}
                  className={`lesson-list-item ${active ? "lesson-list-item-active" : ""}`}
                >
                  {lesson}
                </Link>
              );
            })}
          </div>
        </aside>

        <main className="lesson-content-column">
          <section className="lesson-card">
            <h2 className="lesson-card-title">Lesson Video</h2>
            <div className="lesson-video-placeholder" />
            <p className="lesson-card-text">
              Watch the guided lesson video before reading the notes below.
            </p>
          </section>

          <section className="lesson-card">
            <h2 className="lesson-card-title">Notes / Documentation</h2>

            <div className="lesson-notes">
              <h3>Lesson Introduction</h3>
              <p>
                This lesson helps the learner understand the correct workflow
                for preparing the pH meter and ensuring accurate readings in the
                VR Fluid Power System  lab.
              </p>

              <h3>Steps</h3>
              <ol>
                <li>Inspect the pH meter and probe condition.</li>
                <li>Prepare the calibration solution.</li>
                <li>Rinse the probe before calibration.</li>
                <li>Record the value shown after stabilization.</li>
              </ol>

              <p>
                Instructor notes entered through the editor can render here
                using Tiptap content later.
              </p>
            </div>
          </section>

          <section className="lesson-card">
            <h2 className="lesson-card-title">Attached Resources</h2>

            <div className="lesson-resources">
              {resources.map((resource) => (
                <div key={resource.name} className="lesson-resource-row">
                  <div>
                    <p className="lesson-resource-name">{resource.name}</p>
                    <p className="lesson-resource-type">{resource.type}</p>
                  </div>

                  <button className="lesson-resource-btn">Open</button>
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside className="lesson-right-column">
          <div className="lesson-sidebar-card">
            <h2 className="lesson-card-title">Lesson Progress</h2>

            <div className="lesson-progress-track">
              <div className="lesson-progress-fill" />
            </div>

            <p className="lesson-progress-text">60% completed</p>
          </div>

          <div className="lesson-sidebar-card">
            <h2 className="lesson-card-title">Quick Actions</h2>

            <div className="lesson-actions">
              <button className="lesson-primary-btn">Mark as Complete</button>
              <button className="lesson-secondary-btn">Previous Lesson</button>
              <button className="lesson-secondary-btn">Next Lesson</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}